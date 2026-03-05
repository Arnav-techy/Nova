import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Layers, Zap, BrainCircuit, ChevronRight } from 'lucide-react'

const pipelineSteps = [
    {
        icon: Database,
        title: 'Data Collection',
        description: 'Ingesting data points from Reddit, Twitter, forums, and market APIs in real-time.',
        detail: 'Our scrapers collect posts, comments, and engagement metrics across r/stocks, r/wallstreetbets, and financial Twitter. Raw data is timestamped and tagged with detected ticker symbols.',
        color: 'text-blue-400',
        glowColor: 'rgba(96, 165, 250, 0.3)',
    },
    {
        icon: Layers,
        title: 'Aggregation Layer',
        description: 'Filtering noise, deduping signals, and structuring unstructured text into clean datasets.',
        detail: 'Duplicate posts are removed, sentiment is normalized, and mentions are aggregated per ticker per time window. The result is a clean signal-ready dataset.',
        color: 'text-indigo-400',
        glowColor: 'rgba(129, 140, 248, 0.3)',
    },
    {
        icon: Zap,
        title: 'Signal Engine',
        description: 'Calculating engagement velocities, sentiment shifts, and early trend formations.',
        detail: 'Each ticker gets a composite score based on mention velocity, sentiment direction, engagement ratio, and cross-platform correlation. Signals above threshold are surfaced.',
        color: 'text-cyan-400',
        glowColor: 'rgba(0, 240, 255, 0.3)',
    },
    {
        icon: BrainCircuit,
        title: 'Nova Reasoning',
        description: 'Applying Amazon Nova LLM analysis to contextualize signals into actionable insights.',
        detail: 'Amazon Nova receives the aggregated data and produces natural-language reasoning — explaining why a ticker is trending, what risks exist, and what the data suggests.',
        color: 'text-brand-primary',
        glowColor: 'rgba(0, 81, 255, 0.3)',
    },
]

function PipelineCard({ step, index }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative group"
        >
            <div className="gradient-border rounded-xl p-6 h-full bg-brand-bg/80 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,81,255,0.1)]">
                {/* Background icon watermark */}
                <div className={`absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${step.color}`}>
                    <step.icon size={120} strokeWidth={1} />
                </div>

                {/* Step number */}
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                    Step {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="h-11 w-11 rounded-xl glass-panel flex items-center justify-center mb-4 border-white/5 group-hover:border-brand-primary/30 transition-colors relative">
                    <step.icon className={`h-5 w-5 ${step.color}`} />
                    <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: `0 0 20px ${step.glowColor}` }}
                    />
                </div>

                {/* Title */}
                <h3 className="text-lg font-mono font-bold text-white mb-2">{step.title}</h3>

                {/* Description / Detail toggle */}
                <p className="text-sm text-gray-400 leading-relaxed">
                    {hovered ? step.detail : step.description}
                </p>

                {/* Hover indicator */}
                <div className="flex items-center gap-1 mt-4 text-xs text-gray-500 group-hover:text-brand-primary transition-colors">
                    <span>{hovered ? 'Technical detail' : 'Hover for details'}</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>

            {/* Connection arrow (desktop) */}
            {index < pipelineSteps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden lg:flex items-center z-20">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-brand-primary/30 to-brand-primary/10" />
                    <div className="h-2 w-2 rounded-full bg-brand-primary/30 data-pulse" />
                </div>
            )}

            {/* Connection arrow (mobile) */}
            {index < pipelineSteps.length - 1 && (
                <div className="flex justify-center lg:hidden py-2">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-brand-primary/30 to-transparent" />
                </div>
            )}
        </motion.div>
    )
}

export function ProductOverview() {
    return (
        <section className="py-28 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-primary/20 text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                        Architecture
                    </div>
                    <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6">
                        The Intelligence <span className="text-gradient-primary">Pipeline</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        How we turn global market noise into structured, high-probability trading signals.
                    </p>
                </motion.div>

                {/* Pipeline flow */}
                <div className="relative">
                    {/* Animated connection line (desktop) */}
                    <svg className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 z-0 hidden lg:block" preserveAspectRatio="none">
                        <line
                            x1="12%" y1="50%" x2="88%" y2="50%"
                            stroke="url(#pipeline-gradient)"
                            strokeWidth="1"
                            strokeDasharray="6 4"
                            style={{ animation: 'line-flow 2s linear infinite' }}
                        />
                        <defs>
                            <linearGradient id="pipeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(0, 240, 255, 0.2)" />
                                <stop offset="50%" stopColor="rgba(0, 81, 255, 0.4)" />
                                <stop offset="100%" stopColor="rgba(0, 240, 255, 0.2)" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative z-10">
                        {pipelineSteps.map((step, index) => (
                            <PipelineCard key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
