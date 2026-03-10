import { Hero } from '../components/sections/Hero'
import { TickerStrip } from '../components/sections/TickerStrip'
import { ProductOverview } from '../components/sections/ProductOverview'
import { Showcase } from '../components/sections/Showcase'
import { GeminiInsights } from '../components/sections/GeminiInsights'
import { MLDashboard } from '../components/sections/MLDashboard'
import { QuoteSection } from '../components/sections/QuoteAndGallery'
import { CTASection, Footer } from '../components/sections/CtaAndFooter'
import { Navbar } from '../components/ui/Navbar'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-primary/30 selection:text-white overflow-x-hidden">
            <Navbar />

            <main>
                <Hero />
                <TickerStrip />
                <div id="platform">
                    <ProductOverview />
                </div>
                <Showcase />
                <GeminiInsights />
                <MLDashboard />
                <QuoteSection />
                <CTASection />
            </main>

            <Footer />
        </div>
    )
}
