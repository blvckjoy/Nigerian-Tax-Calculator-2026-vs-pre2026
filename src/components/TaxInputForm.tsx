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
    if (value) setMonthlySalary('');
  };

  const handleMonthlySalaryChange = (value: string) => {
    const formatted = formatCurrency(value);
    setMonthlySalary(formatted);
    const monthly = parseCurrency(value);
    setAnnualGrossIncome(formatCurrency(String(monthly * 12)));
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 animate-fadeIn">
      {/* Form Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f0b429]/20 to-[#f0b429]/5 flex items-center justify-center border border-[#f0b429]/20">
          <svg className="w-5 h-5 text-[#f0b429]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white">Income Information</h2>
          <p className="text-sm text-[#64748b]">Enter your details to calculate taxes</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Annual Gross Income */}
        <div className="space-y-2">
          <label htmlFor="annualIncome" className="block text-sm font-semibold text-[#f8fafc]">
            Annual Gross Income <span className="text-[#fb7185]">*</span>
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0b429] font-semibold text-lg">
              N
            </span>
            <input
              type="text"
              id="annualIncome"
              value={annualGrossIncome}
              onChange={(e) => handleAnnualIncomeChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-4 rounded-xl input-dark text-lg font-medium ${
                errors.annualGrossIncome ? 'border-[#fb7185] focus:border-[#fb7185]' : ''
              }`}
              placeholder="0"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f0b429]/0 via-[#f0b429]/5 to-[#f0b429]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          {errors.annualGrossIncome && (
            <p className="text-sm text-[#fb7185] flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.annualGrossIncome}
            </p>
          )}
          <p className="text-xs text-[#64748b]">Your total annual income before deductions</p>
        </div>

        {/* Divider with OR */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-medium text-[#64748b] uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Monthly Salary */}
        <div className="space-y-2">
          <label htmlFor="monthlySalary" className="block text-sm font-semibold text-[#f8fafc]">
            Monthly Salary <span className="text-[#64748b] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] font-medium">N</span>
            <input
              type="text"
              id="monthlySalary"
              value={monthlySalary}
              onChange={(e) => handleMonthlySalaryChange(e.target.value)}
              className="w-full pl-10 pr-4 py-4 rounded-xl input-dark"
              placeholder="0"
            />
          </div>
          <p className="text-xs text-[#64748b]">Annual income will be calculated automatically (Monthly x 12)</p>
        </div>

        {/* Two Column Grid for Deductions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pension Deduction */}
          <div className="space-y-2">
            <label htmlFor="pensionDeduction" className="block text-sm font-semibold text-[#f8fafc]">
              Pension Deduction <span className="text-[#64748b] font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] font-medium">N</span>
              <input
                type="text"
                id="pensionDeduction"
                value={pensionDeduction}
                onChange={(e) => setPensionDeduction(formatCurrency(e.target.value))}
                className={`w-full pl-10 pr-4 py-4 rounded-xl input-dark ${
                  errors.pensionDeduction ? 'border-[#fb7185] focus:border-[#fb7185]' : ''
                }`}
                placeholder="0"
              />
            </div>
            {errors.pensionDeduction && (
              <p className="text-sm text-[#fb7185]">{errors.pensionDeduction}</p>
            )}
            <p className="text-xs text-[#64748b]">Commonly 8% of gross income</p>
          </div>

          {/* NHF Deduction */}
          <div className="space-y-2">
            <label htmlFor="nhfDeduction" className="block text-sm font-semibold text-[#f8fafc]">
              NHF Deduction <span className="text-[#64748b] font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] font-medium">N</span>
              <input
                type="text"
                id="nhfDeduction"
                value={nhfDeduction}
                onChange={(e) => setNhfDeduction(formatCurrency(e.target.value))}
                className={`w-full pl-10 pr-4 py-4 rounded-xl input-dark ${
                  errors.nhfDeduction ? 'border-[#fb7185] focus:border-[#fb7185]' : ''
                }`}
                placeholder="0"
              />
            </div>
            {errors.nhfDeduction && (
              <p className="text-sm text-[#fb7185]">{errors.nhfDeduction}</p>
            )}
            <p className="text-xs text-[#64748b]">Commonly 2.5% of gross income</p>
          </div>
        </div>

        {/* Annual Rent Paid */}
        <div className="space-y-2">
          <label htmlFor="rentPaid" className="block text-sm font-semibold text-[#f8fafc]">
            Annual Rent Paid <span className="text-[#64748b] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] font-medium">N</span>
            <input
              type="text"
              id="rentPaid"
              value={annualRentPaid}
              onChange={(e) => setAnnualRentPaid(formatCurrency(e.target.value))}
              className="w-full pl-10 pr-4 py-4 rounded-xl input-dark"
              placeholder="0"
            />
          </div>
          <p className="text-xs text-[#64748b]">For new regime rent relief calculation (20% of rent, capped at N500,000)</p>
        </div>

        {/* Taxes Already Paid */}
        <div className="space-y-2">
          <label htmlFor="taxesPaid" className="block text-sm font-semibold text-[#f8fafc]">
            Taxes Already Paid (PAYE Withholding) <span className="text-[#64748b] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] font-medium">N</span>
            <input
              type="text"
              id="taxesPaid"
              value={taxesAlreadyPaid}
              onChange={(e) => setTaxesAlreadyPaid(formatCurrency(e.target.value))}
              className="w-full pl-10 pr-4 py-4 rounded-xl input-dark"
              placeholder="0"
            />
          </div>
          <p className="text-xs text-[#64748b]">Total tax withheld by your employer in the tax year</p>
        </div>

        {/* Info Box */}
        <div className="flex gap-3 p-4 rounded-xl bg-[#f0b429]/5 border border-[#f0b429]/20">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-[#f0b429]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-[#94a3b8]">
            <span className="font-semibold text-[#f0b429]">Tip:</span> Enter your pension and NHF contributions manually.
            If left blank, they will be treated as zero. Standard rates are 8% for pension and 2.5% for NHF.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-gold py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculate Tax
          </span>
        </button>
      </div>
    </form>
  );
}
