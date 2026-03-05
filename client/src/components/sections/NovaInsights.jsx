import { useState } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, Search, Sparkles, AlertTriangle, TrendingUp, MessageCircle, Loader2 } from 'lucide-react'
import { insightService } from '../../services/insightService'
import { Button } from '../ui/Button'
import { SkeletonText } from '../ui/Skeleton'

export function NovaInsights() {
    const [ticker, setTicker] = useState('')
    const [insight, setInsight] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!ticker.trim()) return

        setLoading(true)
        setError('')
        setInsight(null)

        try {
            const data = await insightService.getTickerInsight(ticker.trim().toUpperCase())
            setInsight(data)
        } catch (err) {
            setError(err.message || 'Failed to generate insight')
        } finally {
            setLoading(false)
        }
    }

    // Parse structured insight if returned as text
    const parseInsight = (raw) => {
        if (!raw) return null
        const text = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2)
        return {
            text,
            // These would be extracted from structured API response in future
            sentiment: null,
            confidence: null,
            riskLevel: null,
        }
    }

    const parsed = insight ? parseInsight(insight.insight) : null

    return (
        <section className="py-28 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-primary/20 text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                        <BrainCircuit className="h-3 w-3" />
                        Amazon Nova
                    </div>
                    <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6">
                        Nova AI <span className="text-gradient-primary">Insights</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Get deep AI-generated analysis on any ticker. Powered by Amazon Nova reasoning engine.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {/* Left — Search input */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="gradient-border rounded-xl p-6 h-full">
                            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Search Ticker</h3>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={ticker}
                                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                        placeholder="e.g. AAPL, NVDA, TSLA"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-colors font-mono text-sm"
                                        maxLength={10}
                                    />
                                </div>
                                <Button type="submit" disabled={loading || !ticker.trim()} className="w-full">
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Generating…
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            Generate Insight
                                        </>
                                    )}
                                </Button>
                            </form>

                            {error && (
                                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                                    {error}
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-white/5">
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">Popular Tickers</p>
                                <div className="flex flex-wrap gap-2">
                                    {['AAPL', 'NVDA', 'TSLA', 'PLTR', 'AMD', 'MSFT'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTicker(t)}
                                            className="px-3 py-1 rounded-md text-xs font-mono text-gray-400 bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Insight output panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="gradient-border rounded-xl p-6 min-h-[400px] flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest">AI Analysis Output</h3>
                                {insight && (
                                    <span className="text-[10px] font-mono text-brand-secondary px-2 py-1 rounded-full glass-panel">
                                        Amazon Nova
                                    </span>
                                )}
                            </div>

                            {/* Loading state */}
                            {loading && (
                                <div className="flex-grow flex flex-col items-center justify-center gap-4">
                                    <div className="relative">
                                        <BrainCircuit className="h-10 w-10 text-brand-primary animate-pulse" />
                                        <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl" />
                                    </div>
                                    <p className="text-sm text-gray-400">Nova is analyzing market data for <span className="text-brand-primary font-mono font-bold">{ticker}</span>…</p>
                                    <SkeletonText lines={4} className="w-full max-w-md mt-4" />
                                </div>
                            )}

                            {/* Empty state */}
                            {!loading && !insight && !error && (
                                <div className="flex-grow flex flex-col items-center justify-center gap-3 text-center">
                                    <BrainCircuit className="h-12 w-12 text-gray-700" />
                                    <p className="text-gray-500 text-sm">Select a ticker to generate AI insight.</p>
                                    <p className="text-gray-600 text-xs">Analysis includes sentiment, risk, confidence, and key discussion highlights.</p>
                                </div>
                            )}

                            {/* Insight content */}
                            {!loading && parsed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex-grow space-y-4"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <h4 className="text-2xl font-mono font-bold text-gradient-primary">
                                            {insight.ticker || ticker}
                                        </h4>
                                    </div>

                                    <div className="bg-black/30 rounded-lg p-5 border border-white/5">
                                        <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">
                                            {parsed.text}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
