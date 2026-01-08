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
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Two Column Layout: New Law vs Old Law */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* NEW LAW COLUMN */}
        <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-green-400">
          {/* Header */}
          <div className="bg-green-600 text-white rounded-lg p-4 mb-6 text-center">
            <h2 className="text-2xl font-bold">PAYE Calculation</h2>
            <p className="text-lg mt-1">New Law (2026)</p>
          </div>

          {/* Section 1: Income Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Income Breakdown
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Annual Gross Income:</span>
                <span className="font-bold">{formatCurrency(newRegime.grossIncome)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: Pension</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.pensionDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: NHF</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.nhfDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: Rent Relief</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.rentRelief || 0)}</span>
              </div>
              <div className="border-t-2 border-gray-400 pt-3 flex justify-between items-center bg-yellow-50 p-3 rounded">
                <span className="font-bold text-gray-800 text-lg">Taxable Income:</span>
                <span className="font-bold text-lg text-blue-600">{formatCurrency(newRegime.taxableIncome)}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Tax Calculation */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Tax Calculation (Tax Brackets)
            </h3>
            <div className="space-y-3">
              {newRegime.taxBreakdown.map((bracket, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <div className="text-sm text-gray-600 mb-1">{bracket.bracket}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {formatCurrency(bracket.amount)} × {formatPercentage(bracket.rate * 100)}
                    </span>
                    <span className="font-bold text-blue-600">{formatCurrency(bracket.tax)}</span>
                  </div>
                </div>
              ))}
              <div className="border-t-2 border-gray-400 pt-3 flex justify-between items-center bg-green-50 p-3 rounded">
                <span className="font-bold text-gray-800 text-lg">Total Annual Tax Due:</span>
                <span className="font-bold text-xl text-green-600">{formatCurrency(newRegime.totalTaxLiability)}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Summary */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Monthly Summary
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Monthly Salary:</span>
                <span className="font-bold">{formatCurrency(newRegime.grossIncome / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: Pension</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.pensionDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: NHF</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.nhfDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: PAYE Tax</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.monthlyTaxLiability)}</span>
              </div>
              <div className="border-t-2 border-gray-400 pt-3 flex justify-between items-center bg-green-50 p-4 rounded border-2 border-green-400">
                <span className="font-bold text-gray-800 text-lg">Monthly Take-Home Pay:</span>
                <span className="font-bold text-2xl text-green-600">
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

        {/* OLD LAW COLUMN */}
        <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-red-400">
          {/* Header */}
          <div className="bg-red-600 text-white rounded-lg p-4 mb-6 text-center">
            <h2 className="text-2xl font-bold">PAYE Calculation</h2>
            <p className="text-lg mt-1">Old Law (Pre-2026)</p>
          </div>

          {/* Income Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Income Breakdown
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Annual Gross Income:</span>
                <span className="font-bold">{formatCurrency(oldRegime.grossIncome)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: Pension</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.pensionDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: NHF</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.nhfDeduction)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: CRA Relief</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.consolidatedReliefAllowance || 0)}</span>
              </div>
              <div className="border-t-2 border-gray-400 pt-3 flex justify-between items-center bg-yellow-50 p-3 rounded">
                <span className="font-bold text-gray-800 text-lg">Taxable Income:</span>
                <span className="font-bold text-lg text-blue-600">{formatCurrency(oldRegime.taxableIncome)}</span>
              </div>
            </div>
          </div>

          {/* Tax Calculation */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Tax Calculation (Tax Brackets)
            </h3>
            <div className="space-y-3">
              {oldRegime.taxBreakdown.map((bracket, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <div className="text-sm text-gray-600 mb-1">{bracket.bracket}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {formatCurrency(bracket.amount)} × {formatPercentage(bracket.rate * 100)}
                    </span>
                    <span className="font-bold text-blue-600">{formatCurrency(bracket.tax)}</span>
                  </div>
                </div>
              ))}
              <div className="border-t-2 border-gray-400 pt-3 flex justify-between items-center bg-red-50 p-3 rounded">
                <span className="font-bold text-gray-800 text-lg">Total Annual Tax Due:</span>
                <span className="font-bold text-xl text-red-600">{formatCurrency(oldRegime.totalTaxLiability)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Monthly Summary
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Monthly Salary:</span>
                <span className="font-bold">{formatCurrency(oldRegime.grossIncome / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: Pension</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.pensionDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: NHF</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.nhfDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pl-4">
                <span className="text-gray-600">Less: PAYE Tax</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.monthlyTaxLiability)}</span>
              </div>
              <div className="border-t-2 border-gray-400 pt-3 flex justify-between items-center bg-green-50 p-4 rounded border-2 border-green-400">
                <span className="font-bold text-gray-800 text-lg">Monthly Take-Home Pay:</span>
                <span className="font-bold text-2xl text-green-600">
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

      {/* Tax Comparison Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-xl p-8 border-2 border-purple-400">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Tax Comparison
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg border-2 border-green-300">
            <p className="text-sm font-semibold text-gray-600 mb-2">New Law (2026)</p>
            <p className="text-3xl font-bold text-green-600 mb-1">
              {formatCurrency(newRegime.totalTaxLiability)}
            </p>
            <p className="text-xs text-gray-500">Annual Tax</p>
            <div className="mt-3 pt-3 border-t">
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(newRegime.monthlyTaxLiability)}
              </p>
              <p className="text-xs text-gray-500">Monthly Tax</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-lg border-2 border-red-300">
            <p className="text-sm font-semibold text-gray-600 mb-2">Old Law (Pre-2026)</p>
            <p className="text-3xl font-bold text-red-600 mb-1">
              {formatCurrency(oldRegime.totalTaxLiability)}
            </p>
            <p className="text-xs text-gray-500">Annual Tax</p>
            <div className="mt-3 pt-3 border-t">
              <p className="text-lg font-bold text-red-600">
                {formatCurrency(oldRegime.monthlyTaxLiability)}
              </p>
              <p className="text-xs text-gray-500">Monthly Tax</p>
            </div>
          </div>

          <div className={`rounded-lg p-6 text-center shadow-lg border-2 ${
            savings >= 0 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
          }`}>
            <p className="text-sm font-semibold text-gray-600 mb-2">
              {savings >= 0 ? 'You Save with New Law!' : 'Old Law is Better'}
            </p>
            <p className={`text-3xl font-bold mb-1 ${savings >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(Math.abs(savings))}
            </p>
            <p className="text-xs text-gray-600">Annual Savings</p>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className={`text-lg font-bold ${savings >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {formatCurrency(Math.abs(savings) / 12)}
              </p>
              <p className="text-xs text-gray-600">Monthly Savings</p>
            </div>
            <div className="mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                savings >= 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}>
                {formatPercentage(Math.abs(savingsPercentage))} {savings >= 0 ? 'Less' : 'More'}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`rounded-lg p-6 text-center ${
          savings >= 0 ? 'bg-green-600' : 'bg-red-600'
        }`}>
          <p className="text-white text-xl font-bold">
            {savings >= 0
              ? '✓ The New Tax Law (2026) is better for you!'
              : '✗ The Old Tax Law (Pre-2026) was better for you'}
          </p>
          <p className="text-white text-sm mt-2">
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
