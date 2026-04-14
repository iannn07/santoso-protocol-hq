import { AdvisorWizard } from "@/components/AdvisorWizard";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <header className="hero-gradient w-full pt-12 pb-20 px-4 text-white text-center relative">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/10 border border-white/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            XLSMART for Business
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Business Package
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-lg mx-auto leading-relaxed">
            Answer 3 quick questions about your industry, team size, and top need — our AI advisor matches you to the right XLSMART solution.
          </p>
        </div>
      </header>

      <section className="flex-1 w-full max-w-2xl mx-auto px-4 -mt-8 relative z-20 pb-12">
        <div className="glass-card rounded-2xl p-5 sm:p-8">
          <AdvisorWizard />
        </div>
      </section>

      <footer className="border-t border-slate-100 py-5 text-center">
        <p className="text-xs text-slate-400 tracking-wide">
          &copy; {new Date().getFullYear()} XLSMART &middot; Solusi bisnis terpadu untuk Indonesia
        </p>
      </footer>
    </main>
  );
}
