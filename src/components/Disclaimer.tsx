import { useState } from 'react';

export default function Disclaimer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      {/* Prominent Warning Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-4 shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-amber-500"
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
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold text-amber-900 mb-2">
              ⚠️ IMPORTANT DISCLAIMER
            </h3>
            <p className="text-amber-800 font-semibold text-base leading-relaxed">
              This calculator is for <span className="underline">informational and educational purposes only</span>.
              It is <span className="underline font-bold">NOT professional tax advice</span>.
              Tax calculations may vary based on individual circumstances.
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-amber-700 hover:text-amber-900 font-semibold underline text-sm"
            >
              {isExpanded ? '▼ Hide full disclaimer' : '► Read full disclaimer and terms'}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Disclaimer Section */}
      {isExpanded && (
        <div className="bg-white border-2 border-amber-400 rounded-lg p-6 space-y-4 text-sm">
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
