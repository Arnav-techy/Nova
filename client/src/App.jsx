import { Hero } from './components/sections/Hero'
import { ProductOverview } from './components/sections/ProductOverview'
import { Showcase } from './components/sections/Showcase'
import { Stats } from './components/sections/Stats'
import { QuoteSection, Gallery } from './components/sections/QuoteAndGallery'
import { CTASection, Footer } from './components/sections/CtaAndFooter'

function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-primary/30 selection:text-white overflow-x-hidden">
      {/* Navigation Bar (Minimal) */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-mono font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            nova<span className="text-brand-primary">.ai</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-brand-primary transition-colors">Platform</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Signals</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Pricing</a>
          </div>
          <button className="text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/10 transition-all">
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <ProductOverview />
        <Showcase />
        <Stats />
        <QuoteSection />
        <Gallery />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

export default App
