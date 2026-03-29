import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Twitter, Github, Linkedin, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export function CTASection() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email.trim()) return
        setSubmitted(true)
        // Future: integrate with backend beta access endpoint
    }

    return (
        <section className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg to-brand-primary/5 z-0" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-secondary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="gradient-border rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-primary/20 text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                        <Sparkles className="h-3 w-3" />
                        Early Access
                    </div>

                    <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-6">
                        Ready to edge out the <span className="text-gradient-primary">market?</span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                        Join the beta to get early access to our Amazon Nova powered market intelligence platform.
                    </p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <div className="relative flex-grow">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-colors text-sm"
                                />
                            </div>
                            <Button type="submit" size="lg" className="h-[46px] px-6 whitespace-nowrap">
                                Request Beta Access
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-panel border-brand-secondary/30 text-brand-secondary"
                        >
                            <Sparkles className="h-4 w-4" />
                            You're on the list! We'll reach out soon.
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-brand-bg border-t border-white/5 py-12 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-mono font-bold text-white mb-4 flex items-center">
                            nova<span className="text-brand-primary">.ai</span>
                        </h3>
                        <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                            Next-generation market intelligence powered by advanced reasoning engines and real-time social sentiment data.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><Link to="/signals" className="hover:text-brand-primary transition-colors">Signals</Link></li>
                            <li><Link to="/insights/AAPL" className="hover:text-brand-primary transition-colors">Insights</Link></li>
                            <li><Link to="/signals" className="hover:text-brand-primary transition-colors">Dashboard</Link></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">API Documentation</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} Nova AI Intelligence. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Github className="h-4 w-4" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
