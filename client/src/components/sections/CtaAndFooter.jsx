import { motion } from 'framer-motion'
import { ArrowRight, Twitter, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '../ui/Button'

export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg to-brand-primary/10 z-0" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-secondary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-panel border-brand-primary/20 rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-mono font-bold text-white mb-6">
                        Ready to edge out the <span className="text-gradient">market?</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Join the beta to get early access to our Amazon Nova powered market intelligence platform.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="h-14 px-8 text-lg font-semibold w-full sm:w-auto">
                            Request Access
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg glass-panel hover:text-brand-primary w-full sm:w-auto">
                            View Documentation
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-bg border-t border-white/5 py-12 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-mono font-bold text-white mb-4 flex items-center">
                            nova<span className="text-brand-primary">.ai</span>
                        </h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Next-generation market intelligence powered by advanced reasoning engines and real-time social sentiment data.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Signals Engine</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Data Pipeline</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">API Documentation</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
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
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
