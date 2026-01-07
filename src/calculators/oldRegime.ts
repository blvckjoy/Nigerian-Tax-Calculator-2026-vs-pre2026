import type { TaxBracket, TaxCalculationResult, TaxInputs } from '../types';

// Old regime tax brackets (pre-2026)
const OLD_TAX_BRACKETS: TaxBracket[] = [
  { limit: 300000, rate: 0.07, label: 'First ₦300,000 @ 7%' },
  { limit: 300000, rate: 0.11, label: 'Next ₦300,000 @ 11%' },
  { limit: 500000, rate: 0.15, label: 'Next ₦500,000 @ 15%' },
  { limit: 500000, rate: 0.19, label: 'Next ₦500,000 @ 19%' },
  { limit: 1600000, rate: 0.21, label: 'Next ₦1,600,000 @ 21%' },
  { limit: Infinity, rate: 0.24, label: 'Above ₦3,200,000 @ 24%' },
];

export function calculateOldRegimeTax(inputs: TaxInputs): TaxCalculationResult {
  const { annualGrossIncome, taxesAlreadyPaid } = inputs;

  // Calculate automatic deductions
  const pensionDeduction = annualGrossIncome * 0.08; // 8% pension
  const nhfDeduction = annualGrossIncome * 0.025; // 2.5% NHF
  const totalAutoDeductions = pensionDeduction + nhfDeduction;

  // Calculate Consolidated Relief Allowance (CRA)
  // Greater of ₦200,000 or 21% of gross income (1% + 20%)
  const percentageRelief = annualGrossIncome * 0.21;
  const consolidatedReliefAllowance = Math.max(200000, percentageRelief);

  // Calculate taxable income
  const taxableIncome = Math.max(
    0,
    annualGrossIncome - totalAutoDeductions - consolidatedReliefAllowance
  );

  // Calculate tax using progressive brackets
  let remainingIncome = taxableIncome;
  let totalTax = 0;
  const taxBreakdown: Array<{
    bracket: string;
    amount: number;
    rate: number;
    tax: number;
  }> = [];

  for (const bracket of OLD_TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const taxableInBracket = Math.min(remainingIncome, bracket.limit);
    const taxForBracket = taxableInBracket * bracket.rate;

    if (taxableInBracket > 0) {
      taxBreakdown.push({
        bracket: bracket.label,
        amount: taxableInBracket,
        rate: bracket.rate,
        tax: taxForBracket,
      });

      totalTax += taxForBracket;
      remainingIncome -= taxableInBracket;
    }
  }

  const monthlyTaxLiability = totalTax / 12;
  const actualMonthlyPAYE = taxesAlreadyPaid / 12;
  const refundOrOwed = taxesAlreadyPaid - totalTax;
  const effectiveTaxRate = annualGrossIncome > 0 ? (totalTax / annualGrossIncome) * 100 : 0;

  return {
    grossIncome: annualGrossIncome,
    pensionDeduction,
    nhfDeduction,
    totalAutoDeductions,
    consolidatedReliefAllowance,
    taxableIncome,
    taxBreakdown,
    totalTaxLiability: totalTax,
    monthlyTaxLiability,
    taxesAlreadyPaid,
    refundOrOwed,
    effectiveTaxRate,
    expectedMonthlyPAYE: monthlyTaxLiability,
    actualMonthlyPAYE,
    monthlyDifference: actualMonthlyPAYE - monthlyTaxLiability,
  };
}
