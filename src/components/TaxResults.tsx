import type { ComparisonResult } from '../types';

interface TaxResultsProps {
  result: ComparisonResult;
}

export default function TaxResults({ result }: TaxResultsProps) {
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
    <div className="space-y-8">
      {/* Summary Comparison Card */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-xl p-6 border-2 border-green-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Tax Comparison Summary
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <p className="text-sm text-gray-600 mb-1">Old Regime (Pre-2026)</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(oldRegime.totalTaxLiability)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Annual Tax</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <p className="text-sm text-gray-600 mb-1">New Regime (2026)</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(newRegime.totalTaxLiability)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Annual Tax</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <p className="text-sm text-gray-600 mb-1">
              {savings >= 0 ? 'You Save' : 'Additional Cost'}
            </p>
            <p className={`text-2xl font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(savings))}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ({formatPercentage(Math.abs(savingsPercentage))})
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Summary Comparison */}
      <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-blue-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Monthly Summary
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Old Regime Monthly Summary */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-red-200">
            <h4 className="font-semibold text-gray-800 mb-3 text-center">Old Regime (Pre-2026)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Monthly Salary:</span>
                <span className="font-bold text-lg">{formatCurrency(oldRegime.grossIncome / 12)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Pension:</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.pensionDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly NHF:</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(oldRegime.nhfDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Monthly PAYE Tax:</span>
                <span className="text-red-600 font-bold text-lg">-{formatCurrency(oldRegime.monthlyTaxLiability)}</span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border-2 border-green-300">
                <span className="font-bold text-gray-800">Take-Home Pay:</span>
                <span className="font-bold text-xl text-green-600">
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

          {/* New Regime Monthly Summary */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-green-200">
            <h4 className="font-semibold text-gray-800 mb-3 text-center">New Regime (2026)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Monthly Salary:</span>
                <span className="font-bold text-lg">{formatCurrency(newRegime.grossIncome / 12)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Pension:</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.pensionDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly NHF:</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(newRegime.nhfDeduction / 12)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Monthly PAYE Tax:</span>
                <span className="text-red-600 font-bold text-lg">-{formatCurrency(newRegime.monthlyTaxLiability)}</span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border-2 border-green-300">
                <span className="font-bold text-gray-800">Take-Home Pay:</span>
                <span className="font-bold text-xl text-green-600">
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

      {/* Side-by-Side Detailed Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Old Regime Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-400">
            Old Tax Regime (Pre-2026)
          </h3>

          <div className="space-y-4">
            {/* Income & Deductions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Income & Deductions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="font-semibold">{formatCurrency(oldRegime.grossIncome)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Pension (8%):</span>
                  <span>-{formatCurrency(oldRegime.pensionDeduction)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>NHF (2.5%):</span>
                  <span>-{formatCurrency(oldRegime.nhfDeduction)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>CRA:</span>
                  <span>-{formatCurrency(oldRegime.consolidatedReliefAllowance || 0)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-2 flex justify-between font-bold">
                  <span>Taxable Income:</span>
                  <span>{formatCurrency(oldRegime.taxableIncome)}</span>
                </div>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Tax Breakdown by Bracket</h4>
              <div className="space-y-2">
                {oldRegime.taxBreakdown.map((bracket, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>{bracket.bracket}</span>
                    </div>
                    <div className="flex justify-between font-semibold ml-2">
                      <span className="text-gray-700">
                        {formatCurrency(bracket.amount)} × {formatPercentage(bracket.rate * 100)}
                      </span>
                      <span className="text-blue-600">{formatCurrency(bracket.tax)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax Summary */}
            <div className="bg-red-50 rounded-lg p-4 border-2 border-red-300">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Annual Tax:</span>
                  <span className="font-bold text-lg text-red-600">
                    {formatCurrency(oldRegime.totalTaxLiability)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Monthly Tax:</span>
                  <span className="font-semibold">{formatCurrency(oldRegime.monthlyTaxLiability)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Effective Rate:</span>
                  <span className="font-semibold">{formatPercentage(oldRegime.effectiveTaxRate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Regime Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-300">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-400">
            New Tax Regime (2026)
          </h3>

          <div className="space-y-4">
            {/* Income & Deductions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Income & Deductions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="font-semibold">{formatCurrency(newRegime.grossIncome)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Pension (8%):</span>
                  <span>-{formatCurrency(newRegime.pensionDeduction)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>NHF (2.5%):</span>
                  <span>-{formatCurrency(newRegime.nhfDeduction)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Rent Relief (20%):</span>
                  <span>-{formatCurrency(newRegime.rentRelief || 0)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-2 flex justify-between font-bold">
                  <span>Taxable Income:</span>
                  <span>{formatCurrency(newRegime.taxableIncome)}</span>
                </div>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Tax Breakdown by Bracket</h4>
              <div className="space-y-2">
                {newRegime.taxBreakdown.map((bracket, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>{bracket.bracket}</span>
                    </div>
                    <div className="flex justify-between font-semibold ml-2">
                      <span className="text-gray-700">
                        {formatCurrency(bracket.amount)} × {formatPercentage(bracket.rate * 100)}
                      </span>
                      <span className="text-blue-600">{formatCurrency(bracket.tax)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax Summary */}
            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Annual Tax:</span>
                  <span className="font-bold text-lg text-green-600">
                    {formatCurrency(newRegime.totalTaxLiability)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Monthly Tax:</span>
                  <span className="font-semibold">{formatCurrency(newRegime.monthlyTaxLiability)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Effective Rate:</span>
                  <span className="font-semibold">{formatPercentage(newRegime.effectiveTaxRate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAYE Comparison Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-purple-300">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly PAYE Comparison</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Old Regime PAYE */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">Old Regime (Pre-2026)</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Monthly PAYE:</span>
                <span className="font-semibold">{formatCurrency(oldRegime.expectedMonthlyPAYE)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Actual Monthly PAYE:</span>
                <span className="font-semibold">{formatCurrency(oldRegime.actualMonthlyPAYE)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Monthly Difference:</span>
                <span className={oldRegime.monthlyDifference >= 0 ? 'text-red-600' : 'text-green-600'}>
                  {oldRegime.monthlyDifference >= 0 ? '+' : ''}
                  {formatCurrency(oldRegime.monthlyDifference)}
                </span>
              </div>
            </div>
          </div>

          {/* New Regime PAYE */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">New Regime (2026)</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Monthly PAYE:</span>
                <span className="font-semibold">{formatCurrency(newRegime.expectedMonthlyPAYE)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Actual Monthly PAYE:</span>
                <span className="font-semibold">{formatCurrency(newRegime.actualMonthlyPAYE)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Monthly Difference:</span>
                <span className={newRegime.monthlyDifference >= 0 ? 'text-red-600' : 'text-green-600'}>
                  {newRegime.monthlyDifference >= 0 ? '+' : ''}
                  {formatCurrency(newRegime.monthlyDifference)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refund/Owed Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Old Regime Refund/Owed */}
        <div className={`rounded-lg shadow-lg p-6 ${
          oldRegime.refundOrOwed >= 0 ? 'bg-green-50 border-2 border-green-400' : 'bg-red-50 border-2 border-red-400'
        }`}>
          <h4 className="font-semibold text-gray-800 mb-3">Old Regime - Tax Status</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Tax Liability:</span>
              <span className="font-semibold">{formatCurrency(oldRegime.totalTaxLiability)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes Already Paid:</span>
              <span className="font-semibold">{formatCurrency(oldRegime.taxesAlreadyPaid)}</span>
            </div>
            <div className="border-t-2 pt-2 flex justify-between items-center">
              <span className="font-bold text-base">
                {oldRegime.refundOrOwed >= 0 ? 'Refund Due:' : 'Amount Owed:'}
              </span>
              <span className={`font-bold text-2xl ${
                oldRegime.refundOrOwed >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(Math.abs(oldRegime.refundOrOwed))}
              </span>
            </div>
          </div>
        </div>

        {/* New Regime Refund/Owed */}
        <div className={`rounded-lg shadow-lg p-6 ${
          newRegime.refundOrOwed >= 0 ? 'bg-green-50 border-2 border-green-400' : 'bg-red-50 border-2 border-red-400'
        }`}>
          <h4 className="font-semibold text-gray-800 mb-3">New Regime - Tax Status</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Tax Liability:</span>
              <span className="font-semibold">{formatCurrency(newRegime.totalTaxLiability)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes Already Paid:</span>
              <span className="font-semibold">{formatCurrency(newRegime.taxesAlreadyPaid)}</span>
            </div>
            <div className="border-t-2 pt-2 flex justify-between items-center">
              <span className="font-bold text-base">
                {newRegime.refundOrOwed >= 0 ? 'Refund Due:' : 'Amount Owed:'}
              </span>
              <span className={`font-bold text-2xl ${
                newRegime.refundOrOwed >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(Math.abs(newRegime.refundOrOwed))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
