import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import { Spinner } from '../components/ui/Spinner'
import { UserPlus, Mail, Lock, User, Image } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function RegisterPage() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
    })
    const [avatar, setAvatar] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!avatar) {
            setError('Avatar image is required')
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('fullName', form.fullName)
            formData.append('email', form.email)
            formData.append('username', form.username)
            formData.append('password', form.password)
            formData.append('avatar', avatar)

            await authService.register(formData)
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-mono font-bold tracking-tight">
                        nova<span className="text-brand-primary">.ai</span>
                    </Link>
                    <h1 className="text-3xl font-mono font-bold text-white mt-6">Create Account</h1>
                    <p className="text-gray-400 mt-2">Join to access AI-powered market intelligence</p>
                </div>

                <div className="glass-panel rounded-2xl p-8 border-brand-primary/20">
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    required
                                    value={form.fullName}
                                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    required
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-colors"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="password"
                                    required
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Avatar Image</label>
                            <div className="relative">
                                <label className="flex items-center gap-3 cursor-pointer w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-gray-400 hover:border-brand-primary/30 transition-colors">
                                    <Image className="h-4 w-4 text-gray-500" />
                                    <span>{avatar ? avatar.name : 'Choose avatar image...'}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setAvatar(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full h-12 text-base mt-2">
                            {loading ? <Spinner size="sm" className="mr-2" /> : <UserPlus className="mr-2 h-4 w-4" />}
                            {loading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-brand-primary hover:text-brand-secondary transition-colors font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
