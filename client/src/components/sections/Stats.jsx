import { motion } from 'framer-motion'
import { Activity, Database, TrendingUp, Cpu } from 'lucide-react'
import { Skeleton } from '../ui/Skeleton'

const statPlaceholders = [
    { icon: Activity, label: 'Signals Processed', color: 'text-brand-primary' },
    { icon: Database, label: 'Data Points Analyzed', color: 'text-brand-secondary' },
    { icon: TrendingUp, label: 'Tickers Tracked', color: 'text-indigo-400' },
    { icon: Cpu, label: 'Model Accuracy', color: 'text-cyan-400' },
]

export function Stats() {
    return (
        <section className="py-20 border-y border-brand-primary/10 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {statPlaceholders.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <div className="gradient-border rounded-2xl p-6 w-full group hover:shadow-[0_0_20px_rgba(0,81,255,0.08)] transition-all">
                                <stat.icon className={`h-6 w-6 mx-auto mb-3 ${stat.color} opacity-50`} />
                                <Skeleton className="h-8 w-20 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-gray-500 font-mono">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-primary/40 data-pulse" />
                        Live metrics from data pipeline will appear here
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
