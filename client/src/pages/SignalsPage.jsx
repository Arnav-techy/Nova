import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signalService } from '../services/signalService'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/ui/Spinner'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import {
    TrendingUp,
    MessageCircle,
    BarChart3,
    RefreshCw,
    LogOut,
    ArrowLeft,
    Zap,
    ChevronRight,
} from 'lucide-react'

export default function SignalsPage() {
    const [signals, setSignals] = useState([])
    const [loading, setLoading] = useState(true)
    const [aggregating, setAggregating] = useState(false)
    const [error, setError] = useState('')
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const fetchSignals = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await signalService.getSignals()
            setSignals(data || [])
        } catch (err) {
            setError(err.message || 'Failed to fetch signals')
        } finally {
            setLoading(false)
        }
    }

    const handleAggregate = async () => {
        setAggregating(true)
        setError('')
        try {
            await signalService.triggerAggregation()
            // Refresh signals after aggregation
            await fetchSignals()
        } catch (err) {
            setError(err.message || 'Aggregation failed')
        } finally {
            setAggregating(false)
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    useEffect(() => {
        fetchSignals()
    }, [])

    return (
        <div className="min-h-screen bg-brand-bg text-white">
            {/* Header */}
            <nav className="glass-panel border-b border-white/5 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-xl font-mono font-bold tracking-tight">
                            nova<span className="text-brand-primary">.ai</span>
                        </Link>
                        <span className="text-gray-500 hidden sm:inline">|</span>
                        <span className="text-gray-400 text-sm hidden sm:inline">Signals Dashboard</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden sm:inline">
                            {user?.fullName || user?.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-mono font-bold">
                            Market <span className="text-gradient-primary">Signals</span>
                        </h1>
                        <p className="text-gray-400 mt-2">
                            {signals.length} signals detected today
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={fetchSignals}
                            variant="outline"
                            disabled={loading}
                            className="glass-panel text-white hover:text-brand-primary"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Button
                            onClick={handleAggregate}
                            disabled={aggregating}
                        >
                            {aggregating ? (
                                <Spinner size="sm" className="mr-2" />
                            ) : (
                                <Zap className="h-4 w-4 mr-2" />
                            )}
                            {aggregating ? 'Processing...' : 'Run Aggregation'}
                        </Button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" />
                    </div>
                )}

                {/* Empty State */}
                {!loading && signals.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-mono text-gray-400 mb-2">No Signals Found</h3>
                        <p className="text-gray-500 mb-6">
                            Run aggregation to process today&apos;s market data
                        </p>
                        <Button onClick={handleAggregate} disabled={aggregating}>
                            <Zap className="h-4 w-4 mr-2" />
                            Run Aggregation
                        </Button>
                    </motion.div>
                )}

                {/* Signals Grid */}
                {!loading && signals.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {signals.map((signal, index) => (
                            <motion.div
                                key={signal._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link to={`/insights/${signal.ticker}`}>
                                    <Card className="h-full hover:border-brand-primary/40 transition-all duration-300 group cursor-pointer">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-3xl font-bold tracking-wide group-hover:text-brand-primary transition-colors">
                                                    {signal.ticker}
                                                </CardTitle>
                                                <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">
                                                {signal.source || 'reddit'} · {signal.date}
                                            </span>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="flex gap-6 mb-4">
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <MessageCircle className="w-4 h-4 mr-1.5 text-brand-secondary" />
                                                    <span className="font-mono font-semibold text-white">{signal.mentions}</span>
                                                    <span className="ml-1">mentions</span>
                                                </div>
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <TrendingUp className="w-4 h-4 mr-1.5 text-brand-primary" />
                                                    <span className="font-mono font-semibold text-white">{signal.engagement}</span>
                                                    <span className="ml-1">engagement</span>
                                                </div>
                                            </div>

                                            {signal.sentimentSummary && signal.sentimentSummary.length > 0 && (
                                                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                                                    <p className="text-xs text-gray-400 line-clamp-2">
                                                        {signal.sentimentSummary[0]}
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
