# Nova - Quant Research Terminal & AI Fintech Platform

Nova is a modern, AI-powered fintech platform designed to resemble a professional quant research terminal. It provides automated social sentiment analysis, ML-driven price predictions, and actionable trading insights using Google's Gemini AI.

## 🚀 Features

- **Quant-Style ML Dashboard**: A professional, dynamic two-panel layout with stock selection and real-time analytics.
- **Nova AI Insights**: Deep, AI-generated analysis on any stock ticker powered by the Google Gemini model.
- **Social Sentiment Scraper**: Automated data collection from Reddit (e.g., r/wallstreetbets, r/stocks, r/investing) to gauge retail market sentiment.
- **Live Data Visualizations**: Interactive charts for Price Predictions, Sentiment Trends, Mention Velocity, and Engagement Scores.
- **Secure Authentication**: User login and registration system to save preferences and track personalized signals.



## 🛠️ Tech Stack

**Frontend (Client):**
- **React.js** (via Vite)
- **Tailwind CSS** (Styling & Design System)
- **Framer Motion** (Animations and premium UI feel)
- **Recharts** (Data visualization and live charts)
- **Lucide React** (Beautiful, consistent icons)

**Backend (Server):**
- **Node.js & Express.js** (API and server logic)
- **MongoDB & Mongoose** (Database and object modeling)
- **Google Generative AI (Gemini)** (For AI insights and text analysis)
- **JWT & Bcrypt** (Secure user authentication)

## 💻 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (Local or Atlas)
- Amazon Nova

### 1. Installation

Clone the repository and install dependencies for both the backend and frontend.

```bash
# 1. Clone the repository (if applicable)
git clone <your-repo-url>
cd Nova

# 2. Install backend dependencies
npm install

# 3. Install frontend dependencies
cd client
npm install
```

### 2. Environment Variables

Create a `.env` file in the **root** folder (`Nova/.env`) and configure the following variables:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string_here
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
NOVA_MODEL_ID=amazon.nova-pro-v1:0   
```

### 3. Running the Application

You need two terminal windows to run both the backend and frontend simultaneously.

**Terminal 1: Start the Backend Server**
```bash
# From the root directory (Nova/)
npm run dev
```
*You should see a message indicating the server is running and MongoDB is connected.*

**Terminal 2: Start the Frontend Client**
```bash
# From the client directory (Nova/client/)
cd client
npm run dev
```
*The React app should now be running at `http://localhost:5173/`.*

### 4. Running the Social Scraper

Nova includes a powerful web scraper to collect market sentiment data from financial subreddits. To run the scraper, open a terminal in the root directory and execute:

```bash
npm run scrape:social
```

This will run the script located at `Web_Scrapper/social_scraper.js` and output the collected data as CSV files in the `csvs/` directory.

## 📁 Project Structure

```text
Nova/
├── client/                     # React frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components (sections, ui)
│   │   ├── pages/              # Application pages (Landing, Login, Register)
│   │   ├── services/           # API integration (signalService, insightService)
│   │   ├── App.jsx             # React root component with routing
│   │   └── index.css           # Global Tailwind CSS styles
│   ├── package.json
│   └── vite.config.js
├── src/                        # Node.js Express backend
│   ├── controllers/            # Route handlers
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API endpoint definitions
│   ├── services/               # Aggregation & AI logic
│   ├── utils/                  # Helper functions
│   └── index.js                # Express app entry point
├── Web_Scrapper/               # Scraping scripts
│   ├── crawler.js
│   ├── social_scraper.js       # Main Reddit sentiment scraper
│   └── report.js
├── csvs/                       # Scraper output data
├── package.json                # Root (backend) dependencies and scripts
└── .env                        # Environment variables (not checked into git)
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the **ISC** License.
