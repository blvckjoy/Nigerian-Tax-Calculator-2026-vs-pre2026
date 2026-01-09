import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Disclaimer from './components/Disclaimer';
import TaxInputForm from './components/TaxInputForm';
import TaxResults from './components/TaxResults';
import { calculateTaxComparison } from './calculators';
import type { TaxInputs, ComparisonResult } from './types';

function App() {
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [inputs, setInputs] = useState<TaxInputs | null>(null);

  const handleCalculate = (inputs: TaxInputs) => {
    const calculationResult = calculateTaxComparison(inputs);
    setResult(calculationResult);
    setInputs(inputs);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setInputs(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] bg-grid-pattern bg-gradient-radial relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0b429]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#34d399]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero Header */}
        <header className="text-center mb-16 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-card border border-[#f0b429]/30">
            <div className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-[#f0b429]">
              2026 TAX REFORM
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight">
            <span className="text-gradient-gold">Tax</span>
            <span className="text-white">Compare</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Calculate your Nigerian income tax under the new 2026 reform.
            <span className="text-white font-medium"> See exactly how much you save.</span>
          </p>

          {/* Audience Tags */}
          <div className="flex flex-wrap justify-center gap-3 opacity-0 animate-fadeIn delay-200" style={{ animationFillMode: 'forwards' }}>
            {[
              { icon: '01', label: 'Salaried Employees' },
              { icon: '02', label: 'Freelancers' },
              { icon: '03', label: 'HR Professionals' },
              { icon: '04', label: 'Tax Consultants' },
            ].map((item, i) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-[#f0b429]/30 transition-all duration-300 group cursor-default"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <span className="text-xs font-mono text-[#f0b429] opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span className="text-sm text-[#94a3b8] group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        </header>

        {/* Disclaimer */}
        <Disclaimer />

        {/* Input Form */}
        <TaxInputForm onCalculate={handleCalculate} />

        {/* Results */}
        {result && inputs && (
          <div id="results" className="mt-16 scroll-mt-8 opacity-0 animate-fadeInUp" style={{ animationFillMode: 'forwards' }}>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  Your Tax Results
                </h2>
                <p className="text-[#64748b]">
                  Calculated based on your income and deductions
                </p>
              </div>
              <button
                onClick={handleReset}
                className="btn-ghost inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Calculation
              </button>
            </div>

            <TaxResults result={result} originalInputs={inputs} />

            {/* Next Steps */}
            <div className="mt-12 glass-card rounded-2xl p-8 opacity-0 animate-fadeIn delay-300" style={{ animationFillMode: 'forwards' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0b429] to-[#d4940a] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0a0e17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">Next Steps</h3>
                  <p className="text-[#64748b] text-sm">Important actions after viewing your results</p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                {[
                  'Review and verify calculations with official FIRS resources',
                  'Consult a qualified tax professional for personalized advice',
                  'Keep records of all calculations and supporting documents',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#94a3b8]">
                    <svg className="w-5 h-5 text-[#34d399] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/5">
          <div className="text-center space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f0b429] to-[#d4940a] flex items-center justify-center">
                <span className="font-display font-bold text-[#0a0e17] text-sm">T</span>
              </div>
              <span className="font-display font-bold text-lg text-white">TaxCompare</span>
            </div>

            <p className="text-sm text-[#64748b]">
              Based on Nigerian Tax Law (2026 Reform) &middot; For informational purposes only
            </p>

            {/* Links */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.firs.gov.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#f0b429] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                FIRS Official Website
              </a>
            </div>

            {/* Privacy Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs text-[#64748b]">
              <svg className="w-4 h-4 text-[#34d399]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              100% Private &middot; Calculations done locally
            </div>

            <p className="text-xs text-[#475569]">
              Not official tax advice. Consult a qualified tax professional for personalized guidance.
            </p>

            {/* Creator Credit */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-xs text-[#475569]">
                Built with care by{' '}
                <a
                  href="https://github.com/blvckjoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f0b429] hover:text-[#f5cc4d] font-medium transition-colors"
                >
                  Blvckjoy
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
