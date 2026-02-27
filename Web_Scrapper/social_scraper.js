import axios from 'axios';
import fs from 'fs';

// Configuration
const REDDIT_SUBS = ['wallstreetbets', 'stocks', 'investing', 'options', 'StockMarket', 'Daytrading', 'pennystocks', 'ValueInvesting', 'dividends', 'SecurityAnalysis'];

// Regex to find tickers like $AAPL, TSLA, etc. (2 to 5 uppercase letters)
// We'll look for strings starting with $ and 1-5 letters or just 2-5 uppercase letters
const TICKER_REGEX = /\$?([A-Z]{2,5})\b/g;

/**
 * Extract ticker symbols from text
 */
function extractTickers(text) {
    if (!text) return [];

    const matches = [];
    let match;
    while ((match = TICKER_REGEX.exec(text)) !== null) {
        // Exclude common English words that are often all uppercase
        const commonWords = ['A', 'I', 'IN', 'ON', 'IT', 'IS', 'TO', 'UP', 'OR', 'US', 'UK', 'CEO', 'CFO', 'FOR', 'AND', 'NOT', 'THE', 'OUT', 'ALL', 'NEW', 'NOW'];
        const ticker = match[1];
        if (!commonWords.includes(ticker)) {
            matches.push(ticker);
        }
    }
    return [...new Set(matches)]; // Return unique tickers
}

/**
 * Scrape Reddit
 */
async function scrapeReddit() {
    console.log('Starting Reddit scrape...');
    const allPosts = [];

    for (const sub of REDDIT_SUBS) {
        console.log(`Scraping r/${sub}...`);
        try {
            // Using the .json extension on Reddit URLs returns JSON data
            // Increased limit to 50 for more data
            const response = await axios.get(`https://www.reddit.com/r/${sub}/hot.json?limit=50`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                }
            });

            const posts = response.data.data.children;

            for (const post of posts) {
                const data = post.data;
                const textTarget = `${data.title} ${data.selftext || ''}`;
                const tickers = extractTickers(textTarget);

                allPosts.push({
                    subreddit: data.subreddit,
                    post_id: data.id,
                    title: data.title.replace(/[\n\r,]/g, ' '), // sanitize for CSV
                    body: (data.selftext || '').replace(/[\n\r,]/g, ' '), // sanitize for CSV
                    author: data.author,
                    upvotes: data.score,
                    number_of_comments: data.num_comments,
                    created_utc: data.created_utc,
                    ticker_symbols: tickers.join('|'),
                    source: 'reddit'
                });
            }
        } catch (error) {
            console.error(`Error scraping r/${sub}:`, error.message);
        }

        // Sleep to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Write to CSV
    if (allPosts.length > 0) {
        let csvContent = 'subreddit,post_id,title,body,author,upvotes,number_of_comments,created_utc,ticker_symbols,source\n';
        for (const post of allPosts) {
            csvContent += `${post.subreddit},${post.post_id},${post.title},${post.body},${post.author},${post.upvotes},${post.number_of_comments},${post.created_utc},${post.ticker_symbols},${post.source}\n`;
        }

        const dirName = 'csvs';
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }

        // Format date dynamically to prevent overwrite on re-runs
        const dateString = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${dirName}/reddit_data_${dateString}.csv`;

        fs.writeFileSync(fileName, csvContent, 'utf-8');
        console.log(`Successfully saved ${allPosts.length} Reddit posts to ${fileName}`);
    } else {
        console.error('No Reddit posts found. Action failing to prevent silent success.');
        process.exit(1);
    }
}

async function main() {
    await scrapeReddit();
}

main();
