import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, Activity, BrainCircuit, LayoutDashboard, FileText } from 'lucide-react'

const navLinks = [
    { label: 'Signals', to: '/signals', icon: Activity },
    { label: 'Insights', to: '/insights/AAPL', icon: BrainCircuit },
    { label: 'Dashboard', to: '/signals', icon: LayoutDashboard },
    { label: 'Docs', to: '#', icon: FileText },
]

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel-strong border-b border-white/5">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-mono font-bold tracking-tight flex items-center gap-1"
                >
                    <span className="text-white">nova</span>
                    <span className="text-brand-primary">.ai</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to
                        return (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? 'text-brand-primary bg-brand-primary/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </div>

                {/* Auth button */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <Link to="/signals">
                            <button className="text-sm font-medium px-5 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/80 transition-all shadow-[0_0_15px_rgba(0,81,255,0.3)]">
                                Dashboard
                            </button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className="text-sm font-medium px-5 py-2 rounded-lg border border-white/10 text-gray-300 hover:border-brand-primary/50 hover:text-white hover:bg-brand-primary/10 transition-all">
                                Login
                            </button>
                        </Link>
                    )}

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-panel-strong border-t border-white/5 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
