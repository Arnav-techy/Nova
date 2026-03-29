import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { insightService } from '../services/insightService'
import { Spinner } from '../components/ui/Spinner'
import { ArrowLeft, BrainCircuit, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function InsightPage() {
    const { ticker } = useParams()
    const [insight, setInsight] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!ticker) return

        setLoading(true)
        setError('')

        insightService
            .getTickerInsight(ticker)
            .then((data) => {
                setInsight(data)
            })
            .catch((err) => {
                setError(err.message || 'Failed to fetch insight')
            })
            .finally(() => setLoading(false))
    }, [ticker])

    return (
        <div className="min-h-screen bg-brand-bg text-white">
            {/* Header */}
            <nav className="glass-panel border-b border-white/5 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-xl font-mono font-bold tracking-tight">
                            nova<span className="text-brand-primary">.ai</span>
                        </Link>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-400 text-sm">AI Insight</span>
                    </div>
                    <Link to="/signals">
                        <Button variant="outline" className="glass-panel text-white hover:text-brand-primary">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Signals
                        </Button>
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Spinner size="lg" />
                        <p className="text-gray-400">
                            Generating AI insight for <span className="text-brand-primary font-mono font-bold">{ticker}</span>...
                        </p>
                        <p className="text-gray-500 text-sm">Amazon Nova is analyzing market data</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-xl font-mono text-red-400 mb-2">Error</h3>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <Link to="/signals">
                            <Button variant="outline" className="glass-panel text-white">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Signals
                            </Button>
                        </Link>
                    </motion.div>
                )}

                {/* Insight Content */}
                {!loading && insight && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-primary/30 text-brand-secondary text-sm mb-6">
                                <BrainCircuit className="h-4 w-4" />
                                Powered by Amazon Nova
                            </div>
                            <h1 className="text-4xl md:text-5xl font-mono font-bold">
                                <span className="text-gradient-primary">{insight.ticker || ticker}</span> Insight
                            </h1>
                        </div>

                        <div className="glass-panel rounded-2xl p-8 border-brand-primary/20">
                            <div className="prose prose-invert max-w-none">
                                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg">
                                    {typeof insight.insight === 'string'
                                        ? insight.insight
                                        : JSON.stringify(insight.insight, null, 2)}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Link to="/signals">
                                <Button variant="outline" className="glass-panel text-white hover:text-brand-primary">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Signals
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
