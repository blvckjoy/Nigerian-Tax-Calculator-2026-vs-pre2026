import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Disclaimer from './components/Disclaimer';
import TaxInputForm from './components/TaxInputForm';
import TaxResults from './components/TaxResults';
import { calculateTaxComparison } from './calculators';
import type { TaxInputs, ComparisonResult } from './types';

function App() {
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const handleCalculate = (inputs: TaxInputs) => {
    const calculationResult = calculateTaxComparison(inputs);
    setResult(calculationResult);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Nigerian Tax Calculator 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare your tax liability under the old (pre-2026) and new (2026) tax regimes.
            Calculate annual and monthly tax, understand refunds or amounts owed.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              Salaried Employees
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              Contractors & Freelancers
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
              HR/Payroll Staff
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
              Tax Consultants
            </span>
          </div>
        </header>

        {/* Disclaimer */}
        <Disclaimer />

        {/* Input Form */}
        <TaxInputForm onCalculate={handleCalculate} />

        {/* Results */}
        {result && (
          <div id="results" className="mt-8 scroll-mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Your Tax Calculation Results</h2>
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                New Calculation
              </button>
            </div>
            <TaxResults result={result} />

            {/* Action Reminder */}
            <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 text-lg mb-2">📌 Next Steps</h3>
              <ul className="list-disc ml-6 text-blue-800 space-y-1">
                <li>Review your results and verify the calculations with official FIRS resources</li>
                <li>Consult with a qualified tax professional for personalized advice</li>
                <li>If owed a refund, file your tax return with supporting documentation</li>
                <li>If you owe taxes, make payment arrangements with the relevant tax authority</li>
                <li>Keep records of all calculations and supporting documents</li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600 border-t pt-6">
          <p className="mb-2">
            <strong>Nigerian Tax Calculator 2026</strong> - For informational purposes only
          </p>
          <p>
            Based on Nigerian Tax Law (2026 Reform) | Not official tax advice |{' '}
            <a
              href="https://www.firs.gov.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit FIRS Official Website
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            All calculations are performed locally in your browser. No data is stored or transmitted.
          </p>
        </footer>

        <Analytics />
      </div>
    </div>
  );
}

export default App;
