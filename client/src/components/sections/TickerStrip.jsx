import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { signalService } from '../../services/signalService'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function TickerStrip() {
    const [tickers, setTickers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        signalService
            .getSignals(null, 50)
            .then((data) => {
                if (data && data.length > 0) {
                    setTickers(data)
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="w-full border-y border-white/5 bg-black/20 py-3 overflow-hidden">
                <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-brand-primary/40 data-pulse" />
                    <span className="text-xs text-gray-500 font-mono">Connecting to signal feed…</span>
                </div>
            </div>
        )
    }

    if (tickers.length === 0) {
        return (
            <div className="w-full border-y border-white/5 bg-black/20 py-3 overflow-hidden">
                <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-400/40 data-pulse" />
                    <span className="text-xs text-gray-500 font-mono">Awaiting signal data from aggregation engine…</span>
                </div>
            </div>
        )
    }

    // Double the tickers for seamless loop
    const allTickers = [...tickers, ...tickers]

    return (
        <div className="w-full border-y border-white/5 bg-black/20 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10" />

            <div className="ticker-strip py-3">
                {allTickers.map((ticker, i) => (
                    <div
                        key={`${ticker.ticker}-${i}`}
                        className="flex items-center gap-2 px-6 whitespace-nowrap border-r border-white/5 last:border-0"
                    >
                        <span className="font-mono font-bold text-sm text-white">{ticker.ticker}</span>
                        <span className="text-xs text-gray-400 font-mono">{ticker.mentions || 0}m</span>
                        {ticker.engagement > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-400" />
                        ) : ticker.engagement < 0 ? (
                            <TrendingDown className="h-3 w-3 text-red-400" />
                        ) : (
                            <Minus className="h-3 w-3 text-gray-500" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
