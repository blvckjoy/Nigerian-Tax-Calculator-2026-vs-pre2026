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
    // Scroll to results
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Header */}
        <header className="text-center mb-12 animate-fadeIn">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
            <span className="text-white text-sm font-semibold tracking-wide">🇳🇬 2026 TAX REFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
            TaxCompare
          </h1>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
              Salaried Employees
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              Freelancers
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
              HR Professionals
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              Tax Consultants
            </span>
          </div>
        </header>

        {/* Disclaimer */}
        <Disclaimer />

        {/* Input Form */}
        <TaxInputForm onCalculate={handleCalculate} />

        {/* Results */}
        {result && inputs && (
          <div id="results" className="mt-12 scroll-mt-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                  Your Tax Results
                </h2>
                <p className="text-sm text-gray-600 mt-1">Calculated based on your income and deductions</p>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Calculation
              </button>
            </div>
            <TaxResults result={result} originalInputs={inputs} />

            {/* Action Reminder */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg md:text-xl">Next Steps</h3>
                  <p className="text-sm text-gray-600">Important actions to take after viewing your results</p>
                </div>
              </div>
              <ul className="space-y-3 ml-13">
                <li className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base">Review your results and verify calculations with official FIRS resources</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base">Consult with a qualified tax professional for personalized advice</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base">Keep records of all calculations and supporting documents</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-900 font-semibold text-base">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              TaxCompare
            </div>

            <p className="text-sm text-gray-600">
              Based on Nigerian Tax Law (2026 Reform) • For informational purposes only
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <a
                href="https://www.firs.gov.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                FIRS Official Website
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                100% Private • Calculations done locally
              </div>
            </div>

            <p className="text-xs text-gray-500 pt-2">
              Not official tax advice. Consult a qualified tax professional for personalized guidance.
            </p>

            {/* Creator Credit */}
            <div className="pt-6 mt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Built with ❤️ by{' '}
                <a
                  href="https://github.com/blvckjoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
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
