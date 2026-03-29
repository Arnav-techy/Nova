import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingUp, MessageCircle, BarChart3, AlertCircle, Activity } from 'lucide-react'
import { signalService } from '../../services/signalService'
import { SkeletonCard } from '../ui/Skeleton'
import { Button } from '../ui/Button'

function SignalCard({ signal }) {
    const sentimentColor =
        signal.engagement > 50
            ? 'text-green-400'
            : signal.engagement < 0
                ? 'text-red-400'
                : 'text-yellow-400'

    const sentimentBg =
        signal.engagement > 50
            ? 'bg-green-400/10'
            : signal.engagement < 0
                ? 'bg-red-400/10'
                : 'bg-yellow-400/10'

    const convictionPct = Math.min(100, Math.max(0, (signal.mentions || 0) / 2))

    return (
        <Link to={`/insights/${signal.ticker}`}>
            <div className="gradient-border rounded-xl p-6 h-full group cursor-pointer hover:shadow-[0_0_30px_rgba(0,81,255,0.1)] transition-all duration-500">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-mono font-bold text-white group-hover:text-brand-primary transition-colors">
                            {signal.ticker}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sentimentBg} ${sentimentColor} mt-1 inline-block`}>
                            {signal.source || 'reddit'}
                        </span>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 font-mono">{signal.date}</div>
                    </div>
                </div>

                {/* Metrics */}
                <div className="flex gap-4 mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                        <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-brand-secondary" />
                        <span className="font-mono font-semibold text-white">{signal.mentions}</span>
                        <span className="ml-1 text-xs">mentions</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                        <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-brand-primary" />
                        <span className="font-mono font-semibold text-white">{signal.engagement}</span>
                        <span className="ml-1 text-xs">engagement</span>
                    </div>
                </div>

                {/* Conviction bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                        <span>MENTION VELOCITY</span>
                        <span>{signal.mentions || '--'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${convictionPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary conviction-bar"
                        />
                    </div>
                </div>

                {/* Insight preview */}
                {signal.sentimentSummary && signal.sentimentSummary.length > 0 && (
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5 relative">
                        <AlertCircle className="w-3.5 h-3.5 text-brand-primary absolute top-3 left-3" />
                        <p className="text-xs text-gray-400 pl-5 leading-relaxed line-clamp-2">
                            {signal.sentimentSummary[0]}
                        </p>
                    </div>
                )}
            </div>
        </Link>
    )
}

export function Showcase() {
    const [signals, setSignals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        signalService
            .getSignals(null, 6)
            .then((data) => setSignals(data || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return (
        <section className="py-28 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-primary/20 text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                            <Activity className="h-3 w-3" />
                            Real-time
                        </div>
                        <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4">
                            Live <span className="text-gradient-primary">Signals</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Real-time insights generated by the AI signal engine.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mt-6 md:mt-0"
                    >
                        <Link to="/signals">
                            <Button variant="outline" className="glass-panel text-white hover:border-brand-primary">
                                View All Signals
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <SkeletonCard />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && signals.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="gradient-border rounded-2xl p-12 max-w-lg mx-auto">
                            <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-mono text-gray-300 mb-2">Signals Loading</h3>
                            <p className="text-gray-500 text-sm">
                                Signals loading from aggregation engine. Run the aggregation pipeline to populate signal data.
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <div className="h-1.5 w-1.5 rounded-full bg-brand-primary data-pulse" />
                                <span className="text-xs text-gray-500 font-mono">Awaiting data…</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Signal cards */}
                {!loading && signals.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {signals.slice(0, 6).map((signal, index) => (
                            <motion.div
                                key={signal._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <SignalCard signal={signal} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
