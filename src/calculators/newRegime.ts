import type { TaxBracket, TaxCalculationResult, TaxInputs } from '../types';

// New regime tax brackets (2026 onwards)
const NEW_TAX_BRACKETS: TaxBracket[] = [
  { limit: 800000, rate: 0, label: 'First ₦800,000 @ 0%' },
  { limit: 2200000, rate: 0.15, label: 'Next ₦2,200,000 @ 15%' },
  { limit: 9000000, rate: 0.18, label: 'Next ₦9,000,000 @ 18%' },
  { limit: 13000000, rate: 0.21, label: 'Next ₦13,000,000 @ 21%' },
  { limit: 25000000, rate: 0.23, label: 'Next ₦25,000,000 @ 23%' },
  { limit: Infinity, rate: 0.25, label: 'Above ₦50,000,000 @ 25%' },
];

const RENT_RELIEF_CAP = 500000; // ₦500,000 cap on rent relief

export function calculateNewRegimeTax(inputs: TaxInputs): TaxCalculationResult {
  const { annualGrossIncome, annualRentPaid, taxesAlreadyPaid } = inputs;

  // Calculate automatic deductions
  const pensionDeduction = annualGrossIncome * 0.08; // 8% pension
  const nhfDeduction = annualGrossIncome * 0.025; // 2.5% NHF
  const totalAutoDeductions = pensionDeduction + nhfDeduction;

  // Calculate Rent Relief (20% of annual rent paid, capped at ₦500,000)
  const rentRelief = Math.min(annualRentPaid * 0.2, RENT_RELIEF_CAP);

  // Calculate taxable income (CRA is abolished in new regime)
  const taxableIncome = Math.max(
    0,
    annualGrossIncome - totalAutoDeductions - rentRelief
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

  for (const bracket of NEW_TAX_BRACKETS) {
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
    rentRelief,
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
