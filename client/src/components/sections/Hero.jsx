import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit } from 'lucide-react'
import { Button } from '../ui/Button'

const TOTAL_FRAMES = 40
const FRAME_INTERVAL = 80

const framePaths = Array.from(
    { length: TOTAL_FRAMES },
    (_, i) => `/hero-frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
)



export function Hero() {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [framesLoaded, setFramesLoaded] = useState(false)
    const canvasRef = useRef(null)
    const imagesRef = useRef([])
    const animationRef = useRef(null)
    const lastTimeRef = useRef(0)

    useEffect(() => {
        let loadedCount = 0
        const images = []
        framePaths.forEach((src, index) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                loadedCount++
                if (loadedCount === TOTAL_FRAMES) setFramesLoaded(true)
            }
            img.onerror = () => {
                loadedCount++
                if (loadedCount === TOTAL_FRAMES) setFramesLoaded(true)
            }
            images[index] = img
        })
        imagesRef.current = images
    }, [])

    const animate = useCallback((timestamp) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp
        const elapsed = timestamp - lastTimeRef.current
        if (elapsed >= FRAME_INTERVAL) {
            lastTimeRef.current = timestamp
            setCurrentFrame(prev => (prev + 1) % TOTAL_FRAMES)
            const canvas = canvasRef.current
            const ctx = canvas?.getContext('2d')
            const img = imagesRef.current[(currentFrame + 1) % TOTAL_FRAMES]
            if (canvas && ctx && img && img.complete) {
                canvas.width = canvas.offsetWidth
                canvas.height = canvas.offsetHeight
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        }
        animationRef.current = requestAnimationFrame(animate)
    }, [currentFrame])

    useEffect(() => {
        if (framesLoaded) {
            animationRef.current = requestAnimationFrame(animate)
        }
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [framesLoaded, animate])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Frame-based Background */}
            <div className="absolute inset-0 z-0">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                    style={{ position: 'absolute', inset: 0 }}
                />
                {!framesLoaded && (
                    <img src={framePaths[0]} alt="" className="w-full h-full object-cover absolute inset-0" />
                )}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-bg/90 via-brand-bg/70 to-brand-bg/95" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-bg/80 via-transparent to-brand-bg/80" />
                <div className="absolute inset-0 z-10 bg-brand-bg/40" />
            </div>

            {/* Animated gradient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] z-[12] pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 via-brand-secondary/10 to-transparent rounded-full blur-[120px] pulse-glow" />
            </div>

            <div className="container relative z-20 mx-auto px-4 text-center">
                {/* Left content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-primary/30 text-brand-secondary text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                        </span>
                        Nova Engine v2.0 Live
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-mono leading-[1.1]">
                        AI-Powered{' '}
                        <span className="text-gradient-primary">Market Intelligence</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
                        Transform raw social data into actionable trading signals using Amazon Nova reasoning and advanced sentiment analysis.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link to="/signals" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full group text-base h-13 px-8">
                                Explore Signals
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/insights/AAPL" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full h-13 px-8 text-base glass-panel text-white hover:text-brand-primary">
                                <BrainCircuit className="mr-2 h-5 w-5" />
                                View Insights
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern z-[15] opacity-20 hidden md:block" />
        </section>
    )
}
