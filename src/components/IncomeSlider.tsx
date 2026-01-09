import { useState, useEffect } from 'react';
import type { TaxInputs } from '../types';
import { calculateTaxComparison } from '../calculators';

interface IncomeSliderProps {
  originalInputs: TaxInputs;
}

export default function IncomeSlider({ originalInputs }: IncomeSliderProps) {
  const [adjustedIncome, setAdjustedIncome] = useState(originalInputs.annualGrossIncome);
  const [minIncome, setMinIncome] = useState(0);
  const [maxIncome, setMaxIncome] = useState(0);

  useEffect(() => {
    const min = Math.max(1000000, Math.floor(originalInputs.annualGrossIncome * 0.5));
    const max = Math.ceil(originalInputs.annualGrossIncome * 3);
    setMinIncome(min);
    setMaxIncome(max);
    setAdjustedIncome(originalInputs.annualGrossIncome);
  }, [originalInputs.annualGrossIncome]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyShort = (amount: number): string => {
    if (amount >= 1000000) {
      return `N${(amount / 1000000).toFixed(1)}M`;
    }
    return formatCurrency(amount);
  };

  const adjustedResult = calculateTaxComparison({
    ...originalInputs,
    annualGrossIncome: adjustedIncome,
  });

  const originalResult = calculateTaxComparison(originalInputs);

  const incomeDiff = adjustedIncome - originalInputs.annualGrossIncome;
  const newLawTaxDiff = adjustedResult.newRegime.totalTaxLiability - originalResult.newRegime.totalTaxLiability;
  const oldLawTaxDiff = adjustedResult.oldRegime.totalTaxLiability - originalResult.oldRegime.totalTaxLiability;

  const handlePresetChange = (percentage: number) => {
    const newIncome = Math.round(originalInputs.annualGrossIncome * percentage);
    setAdjustedIncome(Math.min(Math.max(newIncome, minIncome), maxIncome));
  };

  const resetToOriginal = () => {
    setAdjustedIncome(originalInputs.annualGrossIncome);
  };

  const isAdjusted = adjustedIncome !== originalInputs.annualGrossIncome;
  const sliderProgress = ((adjustedIncome - minIncome) / (maxIncome - minIncome)) * 100;

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 opacity-0 animate-fadeIn delay-300" style={{ animationFillMode: 'forwards' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0b429]/20 to-[#f0b429]/5 flex items-center justify-center border border-[#f0b429]/20">
          <svg className="w-6 h-6 text-[#f0b429]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white">What If I Earn More?</h2>
          <p className="text-sm text-[#64748b]">Explore how your tax changes with different income levels</p>
        </div>
      </div>

      {/* Current Income Display */}
      <div className="glass-card rounded-xl p-4 mb-8 border border-[#f0b429]/20">
        <div className="text-center">
          <p className="text-sm text-[#64748b] mb-1">Your Current Annual Income</p>
          <p className="font-display text-2xl font-bold text-gradient-gold">
            {formatCurrency(originalInputs.annualGrossIncome)}
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-[#64748b] font-medium">{formatCurrencyShort(minIncome)}</span>
          <div className="text-center flex-1 mx-4">
            <p className="font-display text-2xl md:text-3xl font-bold text-white">
              {formatCurrency(adjustedIncome)}
            </p>
            {isAdjusted && (
              <p className={`text-sm mt-1 ${incomeDiff > 0 ? 'text-[#34d399]' : 'text-[#fb7185]'}`}>
                {incomeDiff > 0 ? '+' : ''}{formatCurrency(incomeDiff)}
              </p>
            )}
          </div>
          <span className="text-xs text-[#64748b] font-medium">{formatCurrencyShort(maxIncome)}</span>
        </div>

        {/* Custom Slider Track */}
        <div className="relative h-2 rounded-full bg-white/10 mb-6">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-[#f0b429] to-[#d4940a]"
            style={{ width: `${sliderProgress}%` }}
          />
          <input
            type="range"
            min={minIncome}
            max={maxIncome}
            step={100000}
            value={adjustedIncome}
            onChange={(e) => setAdjustedIncome(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#f0b429] to-[#d4940a] border-4 border-[#0a0e17] shadow-lg shadow-[#f0b429]/30 pointer-events-none transition-all duration-150"
            style={{ left: `calc(${sliderProgress}% - 12px)` }}
          />
        </div>

        {/* Preset Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { label: '+10%', value: 1.1 },
            { label: '+25%', value: 1.25 },
            { label: '+50%', value: 1.5 },
            { label: 'Double', value: 2 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePresetChange(preset.value)}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-[#94a3b8] font-semibold text-sm hover:bg-[#f0b429]/10 hover:border-[#f0b429]/30 hover:text-[#f0b429] transition-all duration-200"
            >
              {preset.label}
            </button>
          ))}
          <button
            onClick={resetToOriginal}
            className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-[#94a3b8] font-semibold text-sm hover:bg-white/10 hover:text-white transition-all duration-200 col-span-2 md:col-span-1"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results Comparison */}
      {isAdjusted && (
        <div className="space-y-6 animate-fadeIn">
          {/* Tax Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* New Law */}
            <div className="glass-card-emerald rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#94a3b8] mb-4">New Law (2026)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748b]">Annual Tax</span>
                  <span className="font-bold text-lg text-[#34d399]">
                    {formatCurrency(adjustedResult.newRegime.totalTaxLiability)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748b]">Monthly Tax</span>
                  <span className="font-semibold text-[#94a3b8]">
                    {formatCurrency(adjustedResult.newRegime.monthlyTaxLiability)}
                  </span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm text-[#64748b]">Take-Home/Month</span>
                  <span className="font-bold text-[#34d399]">
                    {formatCurrency(
                      (adjustedIncome / 12) -
                      (originalInputs.pensionDeduction / 12) -
                      (originalInputs.nhfDeduction / 12) -
                      adjustedResult.newRegime.monthlyTaxLiability
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Old Law */}
            <div className="glass-card-coral rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#94a3b8] mb-4">Old Law (Pre-2026)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748b]">Annual Tax</span>
                  <span className="font-bold text-lg text-[#fb7185]">
                    {formatCurrency(adjustedResult.oldRegime.totalTaxLiability)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748b]">Monthly Tax</span>
                  <span className="font-semibold text-[#94a3b8]">
                    {formatCurrency(adjustedResult.oldRegime.monthlyTaxLiability)}
                  </span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm text-[#64748b]">Take-Home/Month</span>
                  <span className="font-bold text-[#fb7185]">
                    {formatCurrency(
                      (adjustedIncome / 12) -
                      (originalInputs.pensionDeduction / 12) -
                      (originalInputs.nhfDeduction / 12) -
                      adjustedResult.oldRegime.monthlyTaxLiability
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="glass-card rounded-xl p-5 border border-[#f0b429]/20">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#f0b429]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Impact of {incomeDiff > 0 ? 'Extra' : 'Reduced'} Income
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Income Change</span>
                <span className={`font-bold ${incomeDiff > 0 ? 'text-[#34d399]' : 'text-[#fb7185]'}`}>
                  {incomeDiff > 0 ? '+' : ''}{formatCurrency(incomeDiff)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">New Law Tax Change</span>
                <span className={`font-semibold ${newLawTaxDiff > 0 ? 'text-[#fb7185]' : 'text-[#34d399]'}`}>
                  {newLawTaxDiff > 0 ? '+' : ''}{formatCurrency(newLawTaxDiff)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Old Law Tax Change</span>
                <span className={`font-semibold ${oldLawTaxDiff > 0 ? 'text-[#fb7185]' : 'text-[#34d399]'}`}>
                  {oldLawTaxDiff > 0 ? '+' : ''}{formatCurrency(oldLawTaxDiff)}
                </span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center bg-[#f0b429]/5 p-3 rounded-lg -mx-3">
                <span className="font-semibold text-white">Net Take-Home Change</span>
                <span className={`font-bold text-lg ${(incomeDiff - newLawTaxDiff) > 0 ? 'text-[#34d399]' : 'text-[#fb7185]'}`}>
                  {(incomeDiff - newLawTaxDiff) > 0 ? '+' : ''}{formatCurrency(incomeDiff - newLawTaxDiff)}
                </span>
              </div>
            </div>
          </div>

          {/* Effective Tax Rate */}
          <div className="flex gap-3 p-4 rounded-xl bg-[#34d399]/5 border border-[#34d399]/20">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-[#34d399]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-[#94a3b8]">
              <span className="font-semibold text-[#34d399]">Effective Tax Rate:</span> At this income level under the New Law,
              you're paying approximately{' '}
              <span className="font-bold text-white">
                {((adjustedResult.newRegime.totalTaxLiability / adjustedIncome) * 100).toFixed(1)}%
              </span>{' '}
              of your total income in tax.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
