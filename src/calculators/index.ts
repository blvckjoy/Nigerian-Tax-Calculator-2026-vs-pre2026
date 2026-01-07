import type { ComparisonResult, TaxInputs } from '../types';
import { calculateOldRegimeTax } from './oldRegime';
import { calculateNewRegimeTax } from './newRegime';

export function calculateTaxComparison(inputs: TaxInputs): ComparisonResult {
  const oldRegime = calculateOldRegimeTax(inputs);
  const newRegime = calculateNewRegimeTax(inputs);

  const savings = oldRegime.totalTaxLiability - newRegime.totalTaxLiability;
  const savingsPercentage =
    oldRegime.totalTaxLiability > 0
      ? (savings / oldRegime.totalTaxLiability) * 100
      : 0;

  return {
    oldRegime,
    newRegime,
    savings,
    savingsPercentage,
  };
}

export { calculateOldRegimeTax, calculateNewRegimeTax };
