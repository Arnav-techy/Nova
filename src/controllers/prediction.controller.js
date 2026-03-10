import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

let cachedCsvData = null;
let lastCacheTime = null;

const parseCSVs = async () => {
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

    return Object.entries(dailyData)
        .map(([date, stats]) => ({ date, ...stats }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const getPrediction = asyncHandler(async (req, res) => {
    const { ticker } = req.params;
    if (!ticker) {
        return res.status(400).json({ message: "Ticker is required" });
    }

    const dailyData = await getAggregatedData(ticker.toUpperCase());

    // Simulate a starting price based on ticker string length or char codes just for a deterministic baseline
    let basePrice = ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) / 2;
    if (basePrice < 10) basePrice = 10;
    if (basePrice > 500) basePrice = basePrice % 500 + 50;

    let currentPrice = basePrice;

    const result = dailyData.map((d, index) => {
        // Create deterministic volatility based on mentions/engagement momentum
        const momentum = (d.mentions * 0.5) + (d.engagement * 0.1);
        const volatilityFactor = (momentum % 10) - 5; // ranges from -5 to +5 approximately

        const priceChange = volatilityFactor * (currentPrice * 0.02); // 2% scaled volatility
        currentPrice = currentPrice + priceChange;

        // Don't let price go negative
        if (currentPrice < 1) currentPrice = 1;

        // Generate prediction bands
        const uncertainty = 2 + (index * 0.5); // uncertainty grows over time slightly

        return {
            date: d.date,
            actual: +(currentPrice.toFixed(2)),
            predicted: +(currentPrice + (volatilityFactor * 0.5)).toFixed(2), // slight divergence
            upperBand: +(currentPrice + uncertainty).toFixed(2),
            lowerBand: +(currentPrice - uncertainty).toFixed(2)
        };
    });

    res.status(200).json(new ApiResponse(200, { ticker: ticker.toUpperCase(), data: result }, "Price prediction fetched successfully"));
});
