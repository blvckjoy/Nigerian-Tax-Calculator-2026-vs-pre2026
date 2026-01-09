import type { ComparisonResult, TaxInputs } from '../types';
import IncomeSlider from './IncomeSlider';

interface TaxResultsProps {
  result: ComparisonResult;
  originalInputs: TaxInputs;
}

export default function TaxResults({ result, originalInputs }: TaxResultsProps) {
  const { oldRegime, newRegime, savings, savingsPercentage } = result;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-8">
      {/* Two Column Layout: New Law vs Old Law */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* NEW LAW COLUMN */}
        <div className="glass-card-emerald rounded-2xl p-6 opacity-0 animate-slideInLeft" style={{ animationFillMode: 'forwards' }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#34d399] to-[#059669] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">New Law</h2>
              <p className="text-sm text-[#34d399]">2026 Tax Reform</p>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
              Income Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Annual Gross Income</span>
                <span className="font-semibold text-white">{formatCurrency(newRegime.grossIncome)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#34d399]/30">
                <span className="text-[#64748b]">Less: Pension</span>
                <span className="text-[#fb7185]">-{formatCurrency(newRegime.pensionDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#34d399]/30">
                <span className="text-[#64748b]">Less: NHF</span>
                <span className="text-[#fb7185]">-{formatCurrency(newRegime.nhfDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#34d399]/30">
                <span className="text-[#64748b]">Less: Rent Relief</span>
                <span className="text-[#fb7185]">-{formatCurrency(newRegime.rentRelief || 0)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="font-semibold text-white">Taxable Income</span>
                <span className="font-bold text-lg text-[#f0b429]">{formatCurrency(newRegime.taxableIncome)}</span>
              </div>
            </div>
          </div>

          {/* Tax Brackets */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
              Tax Brackets
            </h3>
            <div className="space-y-2">
              {newRegime.taxBreakdown.map((bracket, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-xs text-[#64748b] mb-1">{bracket.bracket}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#94a3b8]">
                      {formatCurrency(bracket.amount)} x {formatPercentage(bracket.rate * 100)}
                    </span>
                    <span className="font-semibold text-[#34d399]">{formatCurrency(bracket.tax)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-[#34d399]/10 border border-[#34d399]/30">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">Total Annual Tax</span>
                <span className="font-bold text-2xl text-[#34d399]">{formatCurrency(newRegime.totalTaxLiability)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div>
            <h3 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
              Monthly Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Monthly Salary</span>
                <span className="font-semibold text-white">{formatCurrency(newRegime.grossIncome / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#34d399]/30">
                <span className="text-[#64748b]">Less: Pension</span>
                <span className="text-[#fb7185]">-{formatCurrency(newRegime.pensionDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#34d399]/30">
                <span className="text-[#64748b]">Less: NHF</span>
                <span className="text-[#fb7185]">-{formatCurrency(newRegime.nhfDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#34d399]/30">
                <span className="text-[#64748b]">Less: PAYE Tax</span>
                <span className="text-[#fb7185]">-{formatCurrency(newRegime.monthlyTaxLiability)}</span>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#34d399]/20 to-[#059669]/20 border border-[#34d399]/40">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Monthly Take-Home</span>
                  <span className="font-bold text-2xl text-[#34d399]">
                    {formatCurrency(
                      (newRegime.grossIncome / 12) -
                      (newRegime.pensionDeduction / 12) -
                      (newRegime.nhfDeduction / 12) -
                      newRegime.monthlyTaxLiability
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OLD LAW COLUMN */}
        <div className="glass-card-coral rounded-2xl p-6 opacity-0 animate-slideInRight delay-100" style={{ animationFillMode: 'forwards' }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fb7185] to-[#e11d48] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">Old Law</h2>
              <p className="text-sm text-[#fb7185]">Pre-2026</p>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
              Income Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Annual Gross Income</span>
                <span className="font-semibold text-white">{formatCurrency(oldRegime.grossIncome)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#fb7185]/30">
                <span className="text-[#64748b]">Less: Pension</span>
                <span className="text-[#fb7185]">-{formatCurrency(oldRegime.pensionDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#fb7185]/30">
                <span className="text-[#64748b]">Less: NHF</span>
                <span className="text-[#fb7185]">-{formatCurrency(oldRegime.nhfDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#fb7185]/30">
                <span className="text-[#64748b]">Less: CRA Relief</span>
                <span className="text-[#fb7185]">-{formatCurrency(oldRegime.consolidatedReliefAllowance || 0)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="font-semibold text-white">Taxable Income</span>
                <span className="font-bold text-lg text-[#f0b429]">{formatCurrency(oldRegime.taxableIncome)}</span>
              </div>
            </div>
          </div>

          {/* Tax Brackets */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
              Tax Brackets
            </h3>
            <div className="space-y-2">
              {oldRegime.taxBreakdown.map((bracket, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-xs text-[#64748b] mb-1">{bracket.bracket}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#94a3b8]">
                      {formatCurrency(bracket.amount)} x {formatPercentage(bracket.rate * 100)}
                    </span>
                    <span className="font-semibold text-[#fb7185]">{formatCurrency(bracket.tax)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-[#fb7185]/10 border border-[#fb7185]/30">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">Total Annual Tax</span>
                <span className="font-bold text-2xl text-[#fb7185]">{formatCurrency(oldRegime.totalTaxLiability)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div>
            <h3 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
              Monthly Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">Monthly Salary</span>
                <span className="font-semibold text-white">{formatCurrency(oldRegime.grossIncome / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#fb7185]/30">
                <span className="text-[#64748b]">Less: Pension</span>
                <span className="text-[#fb7185]">-{formatCurrency(oldRegime.pensionDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#fb7185]/30">
                <span className="text-[#64748b]">Less: NHF</span>
                <span className="text-[#fb7185]">-{formatCurrency(oldRegime.nhfDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-l-2 border-[#fb7185]/30">
                <span className="text-[#64748b]">Less: PAYE Tax</span>
                <span className="text-[#fb7185]">-{formatCurrency(oldRegime.monthlyTaxLiability)}</span>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#34d399]/20 to-[#059669]/20 border border-[#34d399]/40">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Monthly Take-Home</span>
                  <span className="font-bold text-2xl text-[#34d399]">
                    {formatCurrency(
                      (oldRegime.grossIncome / 12) -
                      (oldRegime.pensionDeduction / 12) -
                      (oldRegime.nhfDeduction / 12) -
                      oldRegime.monthlyTaxLiability
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Comparison Summary */}
      <div className="glass-card-gold rounded-2xl p-8 opacity-0 animate-fadeInUp delay-200" style={{ animationFillMode: 'forwards' }}>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Tax Comparison
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* New Law Card */}
          <div className="glass-card-emerald rounded-xl p-6 text-center">
            <p className="text-sm font-medium text-[#94a3b8] mb-2">New Law (2026)</p>
            <p className="font-display text-3xl font-bold text-[#34d399] mb-1">
              {formatCurrency(newRegime.totalTaxLiability)}
            </p>
            <p className="text-xs text-[#64748b]">Annual Tax</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-lg font-bold text-[#34d399]">
                {formatCurrency(newRegime.monthlyTaxLiability)}
              </p>
              <p className="text-xs text-[#64748b]">Monthly Tax</p>
            </div>
          </div>

          {/* Old Law Card */}
          <div className="glass-card-coral rounded-xl p-6 text-center">
            <p className="text-sm font-medium text-[#94a3b8] mb-2">Old Law (Pre-2026)</p>
            <p className="font-display text-3xl font-bold text-[#fb7185] mb-1">
              {formatCurrency(oldRegime.totalTaxLiability)}
            </p>
            <p className="text-xs text-[#64748b]">Annual Tax</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-lg font-bold text-[#fb7185]">
                {formatCurrency(oldRegime.monthlyTaxLiability)}
              </p>
              <p className="text-xs text-[#64748b]">Monthly Tax</p>
            </div>
          </div>

          {/* Savings Card */}
          <div className={`rounded-xl p-6 text-center ${
            savings >= 0
              ? 'bg-gradient-to-br from-[#34d399]/20 to-[#059669]/10 border border-[#34d399]/40'
              : 'bg-gradient-to-br from-[#fb7185]/20 to-[#e11d48]/10 border border-[#fb7185]/40'
          }`}>
            <p className="text-sm font-medium text-[#94a3b8] mb-2">
              {savings >= 0 ? 'You Save' : 'Extra Cost'}
            </p>
            <p className={`font-display text-3xl font-bold mb-1 ${savings >= 0 ? 'text-[#34d399]' : 'text-[#fb7185]'}`}>
              {formatCurrency(Math.abs(savings))}
            </p>
            <p className="text-xs text-[#64748b]">Annual Savings</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className={`text-lg font-bold ${savings >= 0 ? 'text-[#34d399]' : 'text-[#fb7185]'}`}>
                {formatCurrency(Math.abs(savings) / 12)}
              </p>
              <p className="text-xs text-[#64748b]">Monthly Savings</p>
            </div>
            <div className="mt-3">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                savings >= 0
                  ? 'bg-[#34d399]/20 text-[#34d399]'
                  : 'bg-[#fb7185]/20 text-[#fb7185]'
              }`}>
                {formatPercentage(Math.abs(savingsPercentage))} {savings >= 0 ? 'Less' : 'More'}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendation Banner */}
        <div className={`rounded-xl p-6 text-center ${
          savings >= 0
            ? 'bg-gradient-to-r from-[#34d399] to-[#059669]'
            : 'bg-gradient-to-r from-[#fb7185] to-[#e11d48]'
        }`}>
          <p className="font-display text-xl font-bold text-white">
            {savings >= 0
              ? 'The New Tax Law (2026) is better for you!'
              : 'The Old Tax Law (Pre-2026) was better for you'}
          </p>
          <p className="text-white/80 text-sm mt-2">
            {savings >= 0
              ? `You will save ${formatCurrency(Math.abs(savings))} annually (${formatCurrency(Math.abs(savings) / 12)} per month)`
              : `You will pay ${formatCurrency(Math.abs(savings))} more annually (${formatCurrency(Math.abs(savings) / 12)} per month)`}
          </p>
        </div>
      </div>

      {/* Income Slider */}
      <IncomeSlider originalInputs={originalInputs} />
    </div>
  );
}
