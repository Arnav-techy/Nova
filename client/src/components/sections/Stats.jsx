import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const AnimatedCounter = ({ end, duration = 2, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0)
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    useEffect(() => {
        if (inView) {
            let start = 0
            const increment = end / (duration * 60)
            const timer = setInterval(() => {
                start += increment
                if (start >= end) {
                    setCount(end)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
            }, 1000 / 60)

            controls.start({ opacity: 1, y: 0 })
            return () => clearInterval(timer)
        }
    }, [inView, end, duration, controls])

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-4xl md:text-5xl font-mono font-bold text-white relative"
        >
            <span className="text-brand-primary absolute -left-4 -top-2 opacity-50">+</span>
            {prefix}{count.toLocaleString()}{suffix}
        </motion.span>
    )
}

export function Stats() {
    const stats = [
        { label: 'Signals Processed', value: 1.2, suffix: 'M+' },
        { label: 'Data Points Analyzed', value: 50, suffix: 'B+' },
        { label: 'Retail Discussions Tracked', value: 850, suffix: 'K' },
        { label: 'Accuracy Rate', value: 94, suffix: '%' }
    ]

    return (
        <section className="py-24 border-y border-brand-primary/10 bg-brand-bg/50 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-brand-primary/10 blur-[120px] rounded-full point-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="p-4 rounded-2xl glass-panel w-full relative group hover:border-brand-primary/40 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                <p className="text-gray-400 mt-2 font-medium">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
