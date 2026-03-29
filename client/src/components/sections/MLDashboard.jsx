import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Cpu, Search, ActivitySquare } from 'lucide-react';
import { SkeletonChart } from '../ui/Skeleton';
import api from '../../services/api';
import {
    AreaChart, Area,
    LineChart, Line,
    BarChart, Bar,
    XAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f1117]/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl">
                <p className="text-gray-400 text-xs mb-2 font-mono uppercase tracking-wider">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-gray-300 font-mono text-xs uppercase">{entry.name}:</span>
                        <span className="text-white font-mono font-bold text-sm ml-auto">
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function MLDashboard() {
    // Stock Selector State
    const [signals, setSignals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTicker, setActiveTicker] = useState(null);
    const [sidebarLoading, setSidebarLoading] = useState(true);

    // Analytics Dashboard State
    const [timeRange, setTimeRange] = useState('30D'); // 7D, 30D, 90D
    const [loading, setLoading] = useState(false);
    const [sentimentData, setSentimentData] = useState([]);
    const [velocityData, setVelocityData] = useState([]);
    const [engagementData, setEngagementData] = useState([]);
    const [predictionData, setPredictionData] = useState([]);
    const [error, setError] = useState(null);

    // Initial Fetch for Sidebar Signals
    useEffect(() => {
        const fetchSignals = async () => {
            try {
                setSidebarLoading(true);
                const sigRes = await api.get('/signals?limit=50');
                const fetchedSignals = sigRes?.data || [];
                setSignals(fetchedSignals);

                if (fetchedSignals.length > 0) {
                    setActiveTicker(fetchedSignals[0].ticker);
                }
            } catch (err) {
                console.error("Error fetching signals API:", err);
                setError("Failed to load initial signals.");
            } finally {
                setSidebarLoading(false);
            }
        };

        fetchSignals();
    }, []);

    // Fetch Charts for Active Ticker
    useEffect(() => {
        if (!activeTicker) return;

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [sentRes, velRes, engRes, predRes] = await Promise.all([
                    api.get(`/ml/sentiment/${activeTicker}`),
                    api.get(`/ml/velocity/${activeTicker}`),
                    api.get(`/ml/engagement/${activeTicker}`),
                    api.get(`/prediction/${activeTicker}`)
                ]);

                // Filter data based on timeRange
                let days = 30;
                if (timeRange === '7D') days = 7;
                if (timeRange === '90D') days = 90;

                const formatData = (dataArray) => {
                    const arr = dataArray || [];
                    // slice to time range
                    const sliced = arr.slice(-days);
                    return sliced.map(d => ({
                        ...d,
                        shortDate: d.date.split('-').slice(1).join('/') // '03/06'
                    }));
                };

                setSentimentData(formatData(sentRes?.data?.data));
                setVelocityData(formatData(velRes?.data?.data));
                setEngagementData(formatData(engRes?.data?.data));
                setPredictionData(formatData(predRes?.data?.data));

            } catch (err) {
                console.error("Error fetching ML panel data:", err);
                setError("Failed to load analytics dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [activeTicker, timeRange]);

    const filteredSignals = signals.filter(s =>
        s.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-20 relative bg-[#06080c] min-h-screen border-t border-white/5">
            {/* Ambient Background */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">
                            <ActivitySquare className="h-3 w-3 text-brand-primary" />
                            Quant Terminal V2.0
                        </div>
                        <h2 className="text-3xl font-mono font-bold tracking-tight">
                            Market <span className="text-gradient-primary">Intelligence</span>
                        </h2>
                    </div>

                    <div className="mt-6 md:mt-0 flex items-center gap-4 bg-black/40 p-1.5 rounded-lg border border-white/5">
                        {['7D', '30D', '90D'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-1.5 rounded text-xs font-mono font-medium transition-all ${timeRange === range
                                        ? 'bg-brand-primary text-black'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 font-mono text-sm max-w-2xl">
                        [SYS_ERROR] {error}
                    </div>
                )}

                {/* Dashboard Grid */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* LEFT PANEL: Stock Selector */}
                    <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search tickers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2 h-[800px] overflow-y-auto custom-scrollbar pr-2">
                            {sidebarLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="h-16 rounded-lg bg-white/5 animate-pulse border border-white/5" />
                                ))
                            ) : filteredSignals.length === 0 ? (
                                <div className="text-center py-10 text-xs font-mono text-gray-500">No signals found</div>
                            ) : (
                                filteredSignals.map((signal) => (
                                    <button
                                        key={signal.ticker}
                                        onClick={() => setActiveTicker(signal.ticker)}
                                        className={`flex flex-col items-start p-3 rounded-lg border transition-all text-left group ${activeTicker === signal.ticker
                                                ? 'bg-brand-primary/10 border-brand-primary/40'
                                                : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex justify-between w-full items-center mb-1">
                                            <span className={`font-mono font-bold text-lg ${activeTicker === signal.ticker ? 'text-brand-primary' : 'text-gray-200'
                                                }`}>
                                                {signal.ticker}
                                            </span>
                                            <div className={`h-1.5 w-1.5 rounded-full ${activeTicker === signal.ticker ? 'bg-brand-primary shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-gray-600'
                                                }`} />
                                        </div>
                                        <div className="flex justify-between w-full text-xs font-mono">
                                            <span className="text-gray-500 group-hover:text-gray-400 transition-colors">
                                                {signal.mentions.toLocaleString()} mnt
                                            </span>
                                            <span className="text-gray-500 group-hover:text-gray-400 transition-colors">
                                                {(signal.engagement / 1000).toFixed(1)}k eng
                                            </span>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Analytics Dashboard */}
                    <div className="flex-1 flex flex-col gap-8">

                        {/* 1. Price Prediction Curve (Hero Chart) */}
                        <div className="glass-panel p-5 rounded-xl border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#a855f7] to-[#06b6d4]" />
                            <div className="flex justify-between items-center mb-6 pl-2">
                                <div className="flex items-center gap-3">
                                    <Cpu className="h-4 w-4 text-purple-400" />
                                    <h3 className="font-mono text-sm tracking-widest uppercase text-gray-300">Algorithmic Price Prediction</h3>
                                </div>
                                {activeTicker && <span className="text-xs font-mono text-brand-primary px-2 py-1 bg-brand-primary/10 rounded">LIVE • {activeTicker}</span>}
                            </div>

                            <div className="h-64 w-full">
                                {loading || !activeTicker ? (
                                    <SkeletonChart />
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={predictionData}>
                                            <XAxis dataKey="shortDate" stroke="#333" fontSize={10} tickLine={false} />
                                            <Tooltip content={<CustomTooltip />} />
                                            {/* Confidence Bands rendered using areas or just overlapping lines. Doing discrete lines for quant purity here */}
                                            <Line type="monotone" dataKey="upperBand" name="Upper Env" stroke="rgba(168, 85, 247, 0.2)" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                                            <Line type="monotone" dataKey="lowerBand" name="Lower Env" stroke="rgba(168, 85, 247, 0.2)" strokeWidth={1} dot={false} strokeDasharray="3 3" />

                                            <Line type="monotone" dataKey="actual" name="Historical" stroke="#06b6d4" strokeWidth={2} dot={false} />
                                            <Line type="monotone" dataKey="predicted" name="Predicted" stroke="#a855f7" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#a855f7', strokeWidth: 0 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        {/* 2 & 3. Sentiment & Velocity (Side by side on large screens) */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                            <div className="glass-panel p-5 rounded-xl border border-white/10 relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="h-4 w-4 text-teal-400" />
                                    <h3 className="font-mono text-sm tracking-widest uppercase text-gray-300">Sentiment Trajectory</h3>
                                </div>
                                <div className="h-48 w-full">
                                    {loading || !activeTicker ? (
                                        <SkeletonChart />
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={sentimentData}>
                                                <defs>
                                                    <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="shortDate" stroke="#333" fontSize={10} tickLine={false} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Area type="monotone" dataKey="value" name="Sentiment" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorSentiment)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>

                            <div className="glass-panel p-5 rounded-xl border border-white/10 relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <Activity className="h-4 w-4 text-blue-500" />
                                    <h3 className="font-mono text-sm tracking-widest uppercase text-gray-300">Velocity Metric</h3>
                                </div>
                                <div className="h-48 w-full">
                                    {loading || !activeTicker ? (
                                        <SkeletonChart />
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={velocityData}>
                                                <XAxis dataKey="shortDate" stroke="#333" fontSize={10} tickLine={false} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Line type="stepAfter" dataKey="value" name="Velocity" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 4. Engagement Volume */}
                        <div className="glass-panel p-5 rounded-xl border border-white/10 relative">
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart3 className="h-4 w-4 text-violet-500" />
                                <h3 className="font-mono text-sm tracking-widest uppercase text-gray-300">Network Engagement Volume</h3>
                            </div>
                            <div className="h-40 w-full">
                                {loading || !activeTicker ? (
                                    <SkeletonChart />
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={engagementData}>
                                            <XAxis dataKey="shortDate" stroke="#333" fontSize={10} tickLine={false} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                            <Bar dataKey="value" name="Engagement" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </section>
    );
}
