import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Cache to prevent constantly re-reading CSVs during development (can be disabled or enhanced in production)
let cachedCsvData = null;
let lastCacheTime = null;

const parseCSVs = async () => {
    // Basic cache invalidation (every 10 minutes)
    if (cachedCsvData && lastCacheTime && (Date.now() - lastCacheTime < 10 * 60 * 1000)) {
        return cachedCsvData;
    }

    const csvDir = path.join(process.cwd(), 'csvs');
    if (!fs.existsSync(csvDir)) {
        return [];
    }

    const files = fs.readdirSync(csvDir).filter(f => f.endsWith('.csv'));
    const allData = [];

    for (const file of files) {
        await new Promise((resolve, reject) => {
            const filePath = path.join(csvDir, file);
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    allData.push(data);
                })
                .on('end', resolve)
                .on('error', reject);
        });
    }

    cachedCsvData = allData;
    lastCacheTime = Date.now();
    return allData;
};

const getAggregatedData = async (ticker) => {
    const data = await parseCSVs();
    const dailyData = {};

    data.forEach(row => {
        const tickers = (row.ticker_symbols || '').split('|');
        if (!tickers.includes(ticker)) return;

        let dateStr = "";
        if (row.created_utc && !isNaN(row.created_utc)) {
            // Convert seconds to JS milliseconds
            dateStr = new Date(parseFloat(row.created_utc) * 1000).toISOString().split('T')[0];
        } else {
            return;
        }

        if (!dailyData[dateStr]) {
            dailyData[dateStr] = { mentions: 0, engagement: 0 };
        }

        dailyData[dateStr].mentions += 1;
        const upvotes = parseInt(row.upvotes) || 0;
        const comments = parseInt(row.number_of_comments) || 0;
        dailyData[dateStr].engagement += (upvotes + comments);
    });

    // Convert object to sorted array
    return Object.entries(dailyData)
        .map(([date, stats]) => ({ date, ...stats }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const getSentimentScore = asyncHandler(async (req, res) => {
    const { ticker } = req.params;
    if (!ticker) {
        return res.status(400).json({ message: "Ticker is required" });
    }

    const dailyData = await getAggregatedData(ticker.toUpperCase());

    // Calculate mentions weighted by engagement
    const result = dailyData.map(d => {
        // Simple metric combining mentions and engagement
        // E.g., a mention with 100 engagement is worth more than 1 mention with 1 engagement
        let rawScore = (d.mentions * 0.5) + (d.engagement * 0.1);
        // We normalize it purely for visual purposes on the chart (0 to 1 range approx)
        // Since we don't know the exact max easily beforehand, we can just apply a sigmoid-like function
        // or just return the raw score if the chart handles large values

        let normalizedScore = rawScore / 100; // arbitrary scale factor
        // ensure it's not larger than 1 if intended, but let's just return real math
        let finalScore = +(Math.min(normalizedScore, 1)).toFixed(2);

        // Alternatively, raw scores might be better so variation is visible
        return {
            date: d.date,
            value: finalScore > 0 ? finalScore : 0.05 // baseline for visibility
        };
    });

    // If max normalization is preferred:
    const maxVal = Math.max(...result.map(r => r.value), 0.001);
    const normalizedResult = result.map(r => ({
        date: r.date,
        value: +(r.value / maxVal).toFixed(2)
    }));

    res.status(200).json(new ApiResponse(200, { ticker: ticker.toUpperCase(), data: normalizedResult }, "Sentiment score fetched successfully"));
});

export const getMentionVelocity = asyncHandler(async (req, res) => {
    const { ticker } = req.params;
    if (!ticker) {
        return res.status(400).json({ message: "Ticker is required" });
    }

    const dailyData = await getAggregatedData(ticker.toUpperCase());

    const result = dailyData.map((d, index, arr) => {
        if (index === 0) {
            return { date: d.date, value: 0 };
        }
        const previousMentions = arr[index - 1].mentions;
        const velocity = d.mentions - previousMentions;
        return { date: d.date, value: velocity };
    });

    res.status(200).json(new ApiResponse(200, { ticker: ticker.toUpperCase(), data: result }, "Mention velocity fetched successfully"));
});

export const getEngagementScore = asyncHandler(async (req, res) => {
    const { ticker } = req.params;
    if (!ticker) {
        return res.status(400).json({ message: "Ticker is required" });
    }

    const dailyData = await getAggregatedData(ticker.toUpperCase());

    const result = dailyData.map(d => ({
        date: d.date,
        value: d.engagement
    }));

    res.status(200).json(new ApiResponse(200, { ticker: ticker.toUpperCase(), data: result }, "Engagement score fetched successfully"));
});
