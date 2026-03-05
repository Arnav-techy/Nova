import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity, Cpu } from 'lucide-react'
import { SkeletonChart } from '../ui/Skeleton'

export function MLDashboard() {
    return (
        <section className="py-28 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-primary/20 text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                        <Cpu className="h-3 w-3" />
                        Machine Learning
                    </div>
                    <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6">
                        ML <span className="text-gradient-primary">Dashboard</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Advanced machine learning signals and visualizations. Charts will populate with live pipeline data.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                    >
                        <SkeletonChart label="Sentiment trend data will appear from the signal pipeline" />
                        <div className="flex items-center gap-2 mt-3 px-2">
                            <TrendingUp className="h-3.5 w-3.5 text-brand-primary" />
                            <span className="text-xs text-gray-400 font-mono">Sentiment Trend</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                    >
                        <SkeletonChart label="Mention velocity data will appear from the aggregation engine" />
                        <div className="flex items-center gap-2 mt-3 px-2">
                            <Activity className="h-3.5 w-3.5 text-brand-secondary" />
                            <span className="text-xs text-gray-400 font-mono">Mention Velocity</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <SkeletonChart label="Engagement scores will appear from cross-platform analytics" />
                        <div className="flex items-center gap-2 mt-3 px-2">
                            <BarChart3 className="h-3.5 w-3.5 text-indigo-400" />
                            <span className="text-xs text-gray-400 font-mono">Engagement Score</span>
                        </div>
                    </motion.div>
                </div>

                {/* Status bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 flex justify-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-gray-500 font-mono">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-primary/40 data-pulse" />
                        Dashboard will display live charts once pipeline data is available
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
