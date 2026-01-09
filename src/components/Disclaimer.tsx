import { useState } from 'react';

export default function Disclaimer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-10 animate-fadeIn delay-100" style={{ animationFillMode: 'forwards', opacity: 0 }}>
      {/* Compact Warning Banner */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-[#fb7185]/20 hover:border-[#fb7185]/40 transition-colors">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fb7185]/20 to-[#e11d48]/10 flex items-center justify-center border border-[#fb7185]/30">
              <svg
                className="w-5 h-5 text-[#fb7185]"
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
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base md:text-lg font-bold text-white mb-2">
              Important Disclaimer
            </h3>
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
              This calculator is for <span className="text-white font-medium">informational purposes only</span>.
              It is <span className="text-[#fb7185] font-semibold">NOT professional tax advice</span>.
              Tax calculations may vary based on individual circumstances.
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-sm text-[#f0b429] hover:text-[#f5cc4d] font-semibold transition-colors group"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {isExpanded ? 'Hide full disclaimer' : 'Read full disclaimer and terms'}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Disclaimer */}
      {isExpanded && (
        <div className="mt-4 glass-card rounded-2xl p-6 md:p-8 space-y-6 text-sm animate-fadeIn border border-white/5">
          <section>
            <h4 className="font-display font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#f0b429]/20 flex items-center justify-center text-xs text-[#f0b429]">1</span>
              Purpose & Limitations
            </h4>
            <p className="text-[#94a3b8] leading-relaxed mb-3">
              This tax calculator provides estimates based on publicly available information about
              Nigerian tax laws effective January 1, 2026. Actual tax liability may differ due to:
            </p>
            <ul className="space-y-2 text-[#94a3b8]">
              {[
                'Individual circumstances not captured in this calculator',
                'Additional allowances, reliefs, or deductions you may qualify for',
                'Regulatory changes or interpretations by tax authorities',
                'Calculation errors or outdated information',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#f0b429] mt-1">&#8226;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="font-display font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#f0b429]/20 flex items-center justify-center text-xs text-[#f0b429]">2</span>
              Legal Notice
            </h4>
            <p className="text-[#94a3b8] leading-relaxed mb-3">
              <span className="text-white font-semibold">This tool does NOT constitute professional tax advice.</span> You should
              consult with a qualified tax professional, accountant, or the Federal Inland Revenue
              Service (FIRS) for personalized advice. The creators and operators of this calculator:
            </p>
            <ul className="space-y-2 text-[#94a3b8]">
              {[
                'Make no warranties about the accuracy or completeness of calculations',
                'Are not liable for any financial losses or tax penalties arising from use',
                'Do not guarantee compliance with Nigerian tax laws',
                'Recommend independent verification of all results',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#f0b429] mt-1">&#8226;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="font-display font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#34d399]/20 flex items-center justify-center text-xs text-[#34d399]">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Data Privacy & Security
            </h4>
            <p className="text-[#94a3b8] leading-relaxed mb-3">
              <span className="text-[#34d399] font-semibold">Your privacy is protected.</span> All calculations are performed locally
              in your browser. We do not:
            </p>
            <ul className="space-y-2 text-[#94a3b8]">
              {[
                'Store or transmit your financial information to any server',
                'Collect personal data or income details',
                'Track your calculations or usage patterns',
                'Share information with third parties',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#34d399] mt-1">&#8226;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#64748b] mt-3 text-xs">
              Your inputs remain private and are cleared when you close or refresh the page.
            </p>
          </section>

          <section>
            <h4 className="font-display font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#f0b429]/20 flex items-center justify-center text-xs text-[#f0b429]">4</span>
              Official Resources
            </h4>
            <p className="text-[#94a3b8] leading-relaxed mb-3">
              For authoritative tax information and filing requirements, please consult:
            </p>
            <ul className="space-y-2 text-[#94a3b8]">
              <li className="flex items-start gap-2">
                <span className="text-[#f0b429] mt-1">&#8226;</span>
                <span><span className="text-white font-medium">Federal Inland Revenue Service (FIRS)</span> - www.firs.gov.ng</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f0b429] mt-1">&#8226;</span>
                <span><span className="text-white font-medium">State Tax Authorities</span> - For state-specific requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f0b429] mt-1">&#8226;</span>
                <span><span className="text-white font-medium">Licensed Tax Consultants</span> - For professional advice</span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl p-5 bg-[#fb7185]/5 border border-[#fb7185]/20">
            <h4 className="font-display font-bold text-[#fb7185] mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Acceptance of Terms
            </h4>
            <p className="text-[#94a3b8] leading-relaxed">
              By using this calculator, you acknowledge that you have read and understood this
              disclaimer, and you agree to use the tool at your own risk. You accept full
              responsibility for verifying all calculations and seeking professional advice
              before making any tax-related decisions.
            </p>
          </section>

          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-xs text-[#64748b]">
              Last Updated: January 2026 | Based on Nigerian Tax Law (2026 Reform)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
