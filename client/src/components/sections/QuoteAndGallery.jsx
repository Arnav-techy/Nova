import { motion } from 'framer-motion'

export function QuoteSection() {
    return (
        <section className="py-32 relative flex items-center justify-center border-y border-brand-primary/10">
            <div className="absolute inset-0 bg-brand-bg mix-blend-multiply z-10" />
            <div className="container relative z-20 mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="text-6xl text-brand-primary/30 font-mono absolute -top-10 left-0">"</div>
                    <h2 className="text-4xl md:text-5xl font-mono leading-tight text-white mb-8 relative z-10">
                        "The market doesn't wait for analysis to complete. Neither should your intelligence platform."
                    </h2>
                    <div className="text-6xl text-brand-primary/30 font-mono absolute -bottom-10 right-0">"</div>

                    <div className="flex flex-col items-center mt-12 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-0.5">
                            <div className="w-full h-full bg-brand-bg rounded-full flex items-center justify-center">
                                <span className="font-bold text-white tracking-widest text-xs">NVA</span>
                            </div>
                        </div>
                        <p className="text-gray-300 font-medium">Nova Engine Core</p>
                        <p className="text-gray-500 text-sm">System Architecture</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export function Gallery() {
    const images = [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80'
    ]

    return (
        <section className="py-24 bg-brand-bg relative overflow-hidden">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4">
                    Platform <span className="text-gradient-primary">Preview</span>
                </h2>
                <p className="text-gray-400 text-lg">
                    A truly modern interface designed for speed and clarity.
                </p>
            </div>

            {/* Horizontal scrolling gallery for desktop, grid for mobile */}
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar gap-6 lg:grid lg:grid-cols-2 lg:overflow-visible">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="min-w-[85vw] md:min-w-[60vw] lg:min-w-0 snap-center relative rounded-2xl overflow-hidden glass-panel border-white/5 group h-[300px] sm:h-[400px]"
                        >
                            <div className="absolute inset-0 bg-brand-bg/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                            <img
                                src={src}
                                alt={`Platform preview ${index + 1}`}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent z-20" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
