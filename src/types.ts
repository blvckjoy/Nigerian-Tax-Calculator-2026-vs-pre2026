export interface TaxInputs {
  annualGrossIncome: number;
  annualRentPaid: number;
  taxesAlreadyPaid: number;
}

export interface TaxBracket {
  limit: number;
  rate: number;
  label: string;
}

export interface TaxCalculationResult {
  grossIncome: number;
  pensionDeduction: number;
  nhfDeduction: number;
  totalAutoDeductions: number;

  // Old regime specific
  consolidatedReliefAllowance?: number;

  // New regime specific
  rentRelief?: number;

  taxableIncome: number;
  taxBreakdown: Array<{
    bracket: string;
    amount: number;
    rate: number;
    tax: number;
  }>;
  totalTaxLiability: number;
  monthlyTaxLiability: number;
  taxesAlreadyPaid: number;
  refundOrOwed: number;
  effectiveTaxRate: number;

  // Monthly PAYE comparison
  expectedMonthlyPAYE: number;
  actualMonthlyPAYE: number;
  monthlyDifference: number;
}

export interface ComparisonResult {
  oldRegime: TaxCalculationResult;
  newRegime: TaxCalculationResult;
  savings: number;
  savingsPercentage: number;
}
