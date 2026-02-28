import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { Signal } from "../models/signal.model.js";

/**
 * Aggregates the daily social data from CSV
 * @param {string} dateStr - The date string strictly in YYYY-MM-DD format
 */
export const aggregateDailyData = async (dateStr) => {
    // 1. Resolve CSV Path
    const csvFileName = `reddit_data_${dateStr}.csv`;
    const csvFilePath = path.resolve(`csvs/${csvFileName}`);

    if (!fs.existsSync(csvFilePath)) {
        throw new Error(`CSV file not found for date: ${dateStr}. Expected path: ${csvFilePath}`);
    }

    const aggregationMap = new Map();
    const records = [];

    // 2. Parse CSV
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on("data", (data) => records.push(data))
            .on("end", async () => {
                try {
                    // 3. Process each record
                    for (const record of records) {
                        const tickers = record.ticker_symbols ? record.ticker_symbols.split("|") : [];

                        const engagement =
                            (parseInt(record.upvotes) || 0) + (parseInt(record.number_of_comments) || 0);

                        for (const ticker of tickers) {
                            if (!ticker.trim()) continue;

                            const cleanTicker = ticker.toUpperCase().trim();

                            if (!aggregationMap.has(cleanTicker)) {
                                aggregationMap.set(cleanTicker, {
                                    ticker: cleanTicker,
                                    mentions: 0,
                                    engagement: 0,
                                    sentimentSummary: [],
                                    date: dateStr,
                                    source: "reddit",
                                });
                            }

                            const group = aggregationMap.get(cleanTicker);
                            group.mentions += 1;
                            group.engagement += engagement;

                            // We'll capture the top 5 most engaged post titles per ticker as a simple sentiment summary for AI processing
                            group.sentimentSummary.push({
                                title: record.title,
                                engagement: engagement,
                            });
                        }
                    }

                    // 4. Transform Map into array of objects to save, trimming out the noise
                    const finalSignals = [];

                    for (const [ticker, data] of aggregationMap.entries()) {
                        // Sort sentiment summaries by highest engagement and keep max 5
                        data.sentimentSummary.sort((a, b) => b.engagement - a.engagement);
                        data.sentimentSummary = data.sentimentSummary
                            .slice(0, 5)
                            .map((s) => s.title); // Extract only the titles

                        finalSignals.push(data);
                    }

                    // 5. Upsert grouped data to MongoDB
                    let processedCount = 0;
                    for (const signalData of finalSignals) {
                        await Signal.findOneAndUpdate(
                            { ticker: signalData.ticker, date: signalData.date, source: signalData.source },
                            {
                                $set: {
                                    mentions: signalData.mentions,
                                    engagement: signalData.engagement,
                                    sentimentSummary: signalData.sentimentSummary,
                                },
                            },
                            { upsert: true, new: true }
                        );
                        processedCount++;
                    }

                    resolve({ success: true, message: `Successfully aggregated ${processedCount} tickers for ${dateStr}` });
                } catch (error) {
                    reject(error);
                }
            })
            .on("error", (error) => reject(error));
    });
};
