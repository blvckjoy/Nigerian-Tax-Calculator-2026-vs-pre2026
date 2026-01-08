import { useState } from 'react';

export default function Disclaimer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-10">
      {/* Prominent Warning Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Important Disclaimer
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              This calculator is for <strong>informational and educational purposes only</strong>.
              It is <strong className="text-red-600">NOT professional tax advice</strong>.
              Tax calculations may vary based on individual circumstances.
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-sm md:text-base text-amber-700 hover:text-amber-900 font-semibold transition-colors group touch-manipulation"
            >
              <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {isExpanded ? 'Hide full disclaimer' : 'Read full disclaimer and terms'}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Disclaimer Section */}
      {isExpanded && (
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 text-sm shadow-sm animate-fadeIn">
          <section>
            <h4 className="font-bold text-gray-900 text-base mb-2">📋 Purpose & Limitations</h4>
            <p className="text-gray-700 leading-relaxed">
              This tax calculator provides estimates based on publicly available information about
              Nigerian tax laws effective January 1, 2026. Actual tax liability may differ due to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Individual circumstances not captured in this calculator</li>
              <li>Additional allowances, reliefs, or deductions you may qualify for</li>
              <li>Regulatory changes or interpretations by tax authorities</li>
              <li>Calculation errors or outdated information</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-gray-900 text-base mb-2">⚖️ Legal Notice</h4>
            <p className="text-gray-700 leading-relaxed">
              <strong>This tool does NOT constitute professional tax advice.</strong> You should
              consult with a qualified tax professional, accountant, or the Federal Inland Revenue
              Service (FIRS) for personalized advice regarding your tax obligations. The creators
              and operators of this calculator:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Make no warranties about the accuracy or completeness of calculations</li>
              <li>Are not liable for any financial losses or tax penalties arising from use of this tool</li>
              <li>Do not guarantee compliance with Nigerian tax laws</li>
              <li>Recommend independent verification of all results</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-gray-900 text-base mb-2">🔒 Data Privacy & Security</h4>
            <p className="text-gray-700 leading-relaxed">
              <strong>Your privacy is important.</strong> All calculations are performed locally
              in your browser. We do not:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Store or transmit your financial information to any server</li>
              <li>Collect personal data or income details</li>
              <li>Track your calculations or usage patterns</li>
              <li>Share information with third parties</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Your inputs remain private and are cleared when you close or refresh the page.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-gray-900 text-base mb-2">📞 Official Resources</h4>
            <p className="text-gray-700 leading-relaxed">
              For authoritative tax information and filing requirements, please consult:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li><strong>Federal Inland Revenue Service (FIRS)</strong> - www.firs.gov.ng</li>
              <li><strong>State Tax Authorities</strong> - For state-specific requirements</li>
              <li><strong>Licensed Tax Consultants</strong> - For professional advice</li>
            </ul>
          </section>

          <section className="bg-red-50 border-l-4 border-red-500 p-4">
            <h4 className="font-bold text-red-900 text-base mb-2">🚨 Acceptance of Terms</h4>
            <p className="text-red-800 font-semibold leading-relaxed">
              By using this calculator, you acknowledge that you have read and understood this
              disclaimer, and you agree to use the tool at your own risk. You accept full
              responsibility for verifying all calculations and seeking professional advice
              before making any tax-related decisions.
            </p>
          </section>

          <div className="text-center pt-4 border-t border-gray-300">
            <p className="text-xs text-gray-600">
              Last Updated: January 2026 | Based on Nigerian Tax Law (2026 Reform)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
