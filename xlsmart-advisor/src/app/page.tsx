import { AdvisorWizard } from "@/components/AdvisorWizard";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <header
        className="w-full py-10 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #7B2FBE 0%, #5c2090 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase opacity-80 mb-2">
            XLSMART for BUSINESS
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            Find Your Perfect Business Package in 3 Questions
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-6">
            Tell us your industry, company size, and top connectivity need — and our AI advisor matches you to the right XLSMART solution in seconds.
          </p>
          <p className="text-xs opacity-60">
            Powered by XLSMART for BUSINESS — serving 330+ industries across Indonesia.
          </p>
        </div>
      </header>

      {/* Wizard */}
      <section className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        <AdvisorWizard />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} XLSMART. Solusi bisnis terpadu untuk Indonesia.</p>
      </footer>
    </main>
  );
}
