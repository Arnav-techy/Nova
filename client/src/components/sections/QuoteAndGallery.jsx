import { motion } from 'framer-motion'

export function QuoteSection() {
    return (
        <section className="py-28 relative flex items-center justify-center border-y border-brand-primary/10 noise-bg overflow-hidden">
            <div className="absolute inset-0 bg-brand-bg z-[1]" />
            {/* Subtle gradient accents */}
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none z-[2]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none z-[2]" />

            <div className="container relative z-20 mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="text-5xl text-brand-primary/20 font-mono leading-none">"</div>

                    <h2 className="text-2xl md:text-4xl font-mono leading-tight text-white relative z-10">
                        The market doesn't wait for analysis to complete. Neither should your intelligence platform.
                    </h2>

                    <div className="text-5xl text-brand-primary/20 font-mono leading-none">"</div>

                    <div className="flex flex-col items-center mt-8 space-y-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-0.5">
                            <div className="w-full h-full bg-brand-bg rounded-full flex items-center justify-center">
                                <span className="font-bold text-white tracking-widest text-[10px]">NVA</span>
                            </div>
                        </div>
                        <p className="text-gray-300 font-medium text-sm">Nova Engine Core</p>
                        <p className="text-gray-500 text-xs">System Architecture</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
