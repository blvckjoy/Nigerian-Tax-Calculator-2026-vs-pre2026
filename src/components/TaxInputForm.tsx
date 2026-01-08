import { useState } from 'react';
import type { TaxInputs } from '../types';

interface TaxInputFormProps {
  onCalculate: (inputs: TaxInputs) => void;
}

export default function TaxInputForm({ onCalculate }: TaxInputFormProps) {
  const [annualGrossIncome, setAnnualGrossIncome] = useState('');
  const [annualRentPaid, setAnnualRentPaid] = useState('');
  const [taxesAlreadyPaid, setTaxesAlreadyPaid] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [pensionDeduction, setPensionDeduction] = useState('');
  const [nhfDeduction, setNhfDeduction] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCurrency = (value: string): string => {
    const number = value.replace(/[^0-9]/g, '');
    if (!number) return '';
    return new Intl.NumberFormat('en-NG').format(parseInt(number));
  };

  const parseCurrency = (value: string): number => {
    return parseInt(value.replace(/[^0-9]/g, '') || '0');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const grossIncome = parseCurrency(annualGrossIncome);
    const pension = parseCurrency(pensionDeduction);
    const nhf = parseCurrency(nhfDeduction);

    if (grossIncome <= 0) {
      newErrors.annualGrossIncome = 'Please enter a valid annual gross income';
    }

    if (pension < 0) {
      newErrors.pensionDeduction = 'Please enter a valid pension deduction';
    }

    if (nhf < 0) {
      newErrors.nhfDeduction = 'Please enter a valid NHF deduction';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCalculate({
      annualGrossIncome: grossIncome,
      annualRentPaid: parseCurrency(annualRentPaid),
      taxesAlreadyPaid: parseCurrency(taxesAlreadyPaid),
      pensionDeduction: pension,
      nhfDeduction: nhf,
    });
  };

  const handleAnnualIncomeChange = (value: string) => {
    setAnnualGrossIncome(formatCurrency(value));
    // Clear monthly salary when annual is manually entered
    if (value) setMonthlySalary('');
  };

  const handleMonthlySalaryChange = (value: string) => {
    const formatted = formatCurrency(value);
    setMonthlySalary(formatted);
    // Calculate annual from monthly
    const monthly = parseCurrency(value);
    setAnnualGrossIncome(formatCurrency(String(monthly * 12)));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Income Information</h2>

      {/* Annual Gross Income */}
      <div>
        <label htmlFor="annualIncome" className="block text-sm font-semibold text-gray-700 mb-2">
          Annual Gross Income <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 font-medium">₦</span>
          <input
            type="text"
            id="annualIncome"
            value={annualGrossIncome}
            onChange={(e) => handleAnnualIncomeChange(e.target.value)}
            className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.annualGrossIncome ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
          />
        </div>
        {errors.annualGrossIncome && (
          <p className="mt-1 text-sm text-red-600">{errors.annualGrossIncome}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Your total annual income before deductions
        </p>
      </div>

      {/* Monthly Salary (Optional Helper) */}
      <div>
        <label htmlFor="monthlySalary" className="block text-sm font-semibold text-gray-700 mb-2">
          Or Enter Monthly Salary <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 font-medium">₦</span>
          <input
            type="text"
            id="monthlySalary"
            value={monthlySalary}
            onChange={(e) => handleMonthlySalaryChange(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Annual income will be calculated automatically (Monthly × 12)
        </p>
      </div>

      {/* Pension Deduction */}
      <div>
        <label htmlFor="pensionDeduction" className="block text-sm font-semibold text-gray-700 mb-2">
          Pension Deduction <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 font-medium">₦</span>
          <input
            type="text"
            id="pensionDeduction"
            value={pensionDeduction}
            onChange={(e) => setPensionDeduction(formatCurrency(e.target.value))}
            className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pensionDeduction ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
          />
        </div>
        {errors.pensionDeduction && (
          <p className="mt-1 text-sm text-red-600">{errors.pensionDeduction}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Your annual pension contribution (commonly 8% of gross income)
        </p>
      </div>

      {/* NHF Deduction */}
      <div>
        <label htmlFor="nhfDeduction" className="block text-sm font-semibold text-gray-700 mb-2">
          NHF Deduction <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 font-medium">₦</span>
          <input
            type="text"
            id="nhfDeduction"
            value={nhfDeduction}
            onChange={(e) => setNhfDeduction(formatCurrency(e.target.value))}
            className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nhfDeduction ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
          />
        </div>
        {errors.nhfDeduction && (
          <p className="mt-1 text-sm text-red-600">{errors.nhfDeduction}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Your annual NHF contribution (commonly 2.5% of gross income)
        </p>
      </div>

      {/* Annual Rent Paid */}
      <div>
        <label htmlFor="rentPaid" className="block text-sm font-semibold text-gray-700 mb-2">
          Annual Rent Paid <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 font-medium">₦</span>
          <input
            type="text"
            id="rentPaid"
            value={annualRentPaid}
            onChange={(e) => setAnnualRentPaid(formatCurrency(e.target.value))}
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          For new regime rent relief calculation (20% of rent, capped at ₦500,000)
        </p>
      </div>

      {/* Taxes Already Paid */}
      <div>
        <label htmlFor="taxesPaid" className="block text-sm font-semibold text-gray-700 mb-2">
          Taxes Already Paid (PAYE Withholding) <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 font-medium">₦</span>
          <input
            type="text"
            id="taxesPaid"
            value={taxesAlreadyPaid}
            onChange={(e) => setTaxesAlreadyPaid(formatCurrency(e.target.value))}
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Total tax withheld by your employer in the tax year
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Deductions:</strong> Enter your pension and NHF contributions manually. If left blank,
              they will be treated as zero. Standard rates are 8% for pension and 2.5% for NHF.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Tax
      </button>
    </form>
  );
}
