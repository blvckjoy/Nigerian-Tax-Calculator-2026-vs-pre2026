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
    // Set range: 50% below to 200% above original income
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
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return formatCurrency(amount);
  };

  // Calculate tax for adjusted income
  const adjustedResult = calculateTaxComparison({
    ...originalInputs,
    annualGrossIncome: adjustedIncome,
  });

  // Calculate original tax
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

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-xl p-6 md:p-8 border-2 border-purple-300">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          💡 What If I Earn More?
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Explore how your tax changes with different income levels
        </p>
      </div>

      {/* Current Income Display */}
      <div className="bg-white rounded-lg p-4 mb-6 border-2 border-purple-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Your Current Annual Income</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {formatCurrency(originalInputs.annualGrossIncome)}
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs md:text-sm text-gray-600">{formatCurrencyShort(minIncome)}</span>
          <div className="text-center flex-1 mx-4">
            <p className="text-lg md:text-2xl font-bold text-purple-600">
              {formatCurrency(adjustedIncome)}
            </p>
            {isAdjusted && (
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {incomeDiff > 0 ? '+' : ''}{formatCurrency(incomeDiff)}
                {incomeDiff > 0 ? ' 📈' : ' 📉'}
              </p>
            )}
          </div>
          <span className="text-xs md:text-sm text-gray-600">{formatCurrencyShort(maxIncome)}</span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={minIncome}
          max={maxIncome}
          step={100000}
          value={adjustedIncome}
          onChange={(e) => setAdjustedIncome(Number(e.target.value))}
          className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          style={{
            background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((adjustedIncome - minIncome) / (maxIncome - minIncome)) * 100}%, #e9d5ff ${((adjustedIncome - minIncome) / (maxIncome - minIncome)) * 100}%, #e9d5ff 100%)`
          }}
        />
      </div>

      {/* Quick Preset Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        <button
          onClick={() => handlePresetChange(1.1)}
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base touch-manipulation"
        >
          +10%
        </button>
        <button
          onClick={() => handlePresetChange(1.25)}
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base touch-manipulation"
        >
          +25%
        </button>
        <button
          onClick={() => handlePresetChange(1.5)}
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base touch-manipulation"
        >
          +50%
        </button>
        <button
          onClick={() => handlePresetChange(2)}
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base touch-manipulation"
        >
          Double
        </button>
        <button
          onClick={resetToOriginal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base touch-manipulation col-span-2 md:col-span-1"
        >
          Reset
        </button>
      </div>

      {/* Results Comparison */}
      {isAdjusted && (
        <div className="space-y-4">
          {/* Tax Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* New Law */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">New Law (2026)</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Annual Tax:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(adjustedResult.newRegime.totalTaxLiability)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Monthly Tax:</span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(adjustedResult.newRegime.monthlyTaxLiability)}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-600">Take-Home/Month:</span>
                  <span className="text-sm font-bold text-green-700">
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
            <div className="bg-white rounded-lg p-4 border-2 border-red-300">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Old Law (Pre-2026)</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Annual Tax:</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(adjustedResult.oldRegime.totalTaxLiability)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Monthly Tax:</span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(adjustedResult.oldRegime.monthlyTaxLiability)}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-600">Take-Home/Month:</span>
                  <span className="text-sm font-bold text-red-700">
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
          <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
            <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base">
              💰 Impact of {incomeDiff > 0 ? 'Extra' : 'Reduced'} Income:
            </h3>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Income Change:</span>
                <span className={`font-bold ${incomeDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {incomeDiff > 0 ? '+' : ''}{formatCurrency(incomeDiff)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">New Law Tax Change:</span>
                <span className={`font-semibold ${newLawTaxDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {newLawTaxDiff > 0 ? '+' : ''}{formatCurrency(newLawTaxDiff)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Old Law Tax Change:</span>
                <span className={`font-semibold ${oldLawTaxDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {oldLawTaxDiff > 0 ? '+' : ''}{formatCurrency(oldLawTaxDiff)}
                </span>
              </div>
              <div className="border-t-2 pt-2 flex justify-between items-center bg-purple-50 p-2 rounded">
                <span className="font-bold text-gray-800">Net Take-Home Change:</span>
                <span className={`font-bold text-lg ${(incomeDiff - newLawTaxDiff) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(incomeDiff - newLawTaxDiff) > 0 ? '+' : ''}{formatCurrency(incomeDiff - newLawTaxDiff)}
                </span>
              </div>
            </div>
          </div>

          {/* Marginal Rate Info */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <p className="text-xs md:text-sm text-blue-800">
              <strong>💡 Good to know:</strong> At this income level under the New Law,
              you're paying approximately{' '}
              <strong>
                {((adjustedResult.newRegime.totalTaxLiability / adjustedIncome) * 100).toFixed(1)}%
              </strong>{' '}
              of your total income in tax.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
