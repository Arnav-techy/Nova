import { motion } from 'framer-motion'
import { Database, Layers, Zap, BrainCircuit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'

const pipelineSteps = [
    {
        icon: Database,
        title: 'Data Collection',
        description: 'Ingesting millions of points from social feeds, news, and market data in real-time.',
        color: 'text-blue-400'
    },
    {
        icon: Layers,
        title: 'Aggregation Layer',
        description: 'Filtering noise, deduping signals, and structuring unstructured text into clean data.',
        color: 'text-indigo-400'
    },
    {
        icon: Zap,
        title: 'Signal Engine',
        description: 'Calculating engagement velocities, sentiment shifts, and early trend formations.',
        color: 'text-cyan-400'
    },
    {
        icon: BrainCircuit,
        title: 'Nova Reasoning',
        description: 'Applying advanced LLM analysis to contextualize signals and output actionable insights.',
        color: 'text-brand-primary'
    }
]

export function ProductOverview() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6">
                        The Intelligence <span className="text-gradient-primary">Pipeline</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        How we turn global market noise into structured, high-probability trading signals.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent hidden lg:block -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {pipelineSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="h-full border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 group bg-brand-bg/80 relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${step.color}`}>
                                        <step.icon size={100} />
                                    </div>

                                    <CardHeader>
                                        <div className="h-12 w-12 rounded-xl glass-panel flex items-center justify-center mb-4 border-white/5 group-hover:border-brand-primary/30 transition-colors">
                                            <step.icon className={`h-6 w-6 ${step.color}`} />
                                        </div>
                                        <CardTitle className="text-xl">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base text-gray-400">
                                            {step.description}
                                        </CardDescription>
                                    </CardContent>

                                    {/* Arrow Indicator for mobile/tablet */}
                                    {index < pipelineSteps.length - 1 && (
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 lg:hidden text-brand-primary/30">
                                            ↓
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
