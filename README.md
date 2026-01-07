# Nigerian Tax Calculator 2026

A comprehensive web application for calculating Nigerian income tax under both the old (pre-2026) and new (2026) tax regimes. Compare your tax liability, understand refunds or amounts owed, and make informed financial decisions.

## Features

### Core Functionality
- **Dual Tax Regime Comparison**: Side-by-side comparison of old (pre-2026) vs new (2026) tax calculations
- **Comprehensive Tax Breakdown**: Detailed breakdown by tax brackets with rates and amounts
- **Monthly PAYE Analysis**: Compare expected vs actual monthly PAYE withholding
- **Refund/Amount Owed Calculator**: Instantly see if you're due a refund or owe additional taxes
- **Automatic Deductions**: Pension (8%) and NHF (2.5%) calculated automatically
- **Rent Relief**: New regime rent relief calculation (20% of rent, capped at ₦500,000)

### Target Users
- Salaried employees (private & public sectors)
- Contractors & freelancers
- HR/payroll staff
- Tax consultants & accountants
- Self-filers

## Tax Regimes

### Old Tax Regime (Pre-2026)
| Taxable Income Range | Tax Rate |
|---------------------|----------|
| First ₦300,000 | 7% |
| Next ₦300,000 | 11% |
| Next ₦500,000 | 15% |
| Next ₦500,000 | 19% |
| Next ₦1,600,000 | 21% |
| Above ₦3,200,000 | 24% |

**Relief**: Consolidated Relief Allowance (CRA) - Greater of ₦200,000 or 21% of gross income (1% + 20%)

### New Tax Regime (2026 onwards)
| Taxable Income Range | Tax Rate |
|---------------------|----------|
| First ₦800,000 | 0% |
| Next ₦2,200,000 | 15% |
| Next ₦9,000,000 | 18% |
| Next ₦13,000,000 | 21% |
| Next ₦25,000,000 | 23% |
| Above ₦50,000,000 | 25% |

**Relief**:
- Rent relief: 20% of annual rent paid (capped at ₦500,000)
- CRA is abolished
- Pension, NHF, NHIS, life insurance continue where applicable

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Installation Steps

1. **Navigate to the project directory**:
   ```bash
   cd tax_calculator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Input Fields

1. **Annual Gross Income** (Required)
   - Your total annual income before any deductions
   - Can also be calculated by entering your monthly salary

2. **Monthly Salary** (Optional)
   - Enter your monthly salary to auto-calculate annual income
   - Annual = Monthly × 12

3. **Annual Rent Paid** (Optional)
   - Total rent paid for the year
   - Used for new regime rent relief calculation
   - 20% of this amount (capped at ₦500,000) is deducted

4. **Taxes Already Paid** (Optional)
   - Total PAYE withholding for the tax year
   - Used to calculate refund or additional amount owed

### Understanding the Results

#### Tax Comparison Summary
- Shows annual tax liability for both regimes
- Displays savings (or additional cost) under new regime
- Percentage difference highlighted

#### Detailed Breakdown (Both Regimes)
- Gross income and all deductions
- Tax calculation by bracket
- Total annual and monthly tax
- Effective tax rate

#### Monthly PAYE Comparison
- Expected monthly PAYE (should have been withheld)
- Actual monthly PAYE (was withheld)
- Monthly difference (over/under payment)

#### Refund/Amount Owed
- Green = Refund due (overpaid taxes)
- Red = Amount owed (underpaid taxes)

## Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Type Safety**: Full TypeScript coverage

## Privacy & Security

✅ **All calculations are performed locally in your browser**
- No data is sent to any server
- No personal information is collected
- No tracking or analytics
- All inputs are cleared when you close/refresh the page

## Legal Disclaimer

⚠️ **IMPORTANT**: This calculator is for informational and educational purposes only. It is NOT professional tax advice.

- Tax calculations may vary based on individual circumstances
- Additional reliefs or deductions may apply to your situation
- Always consult with a qualified tax professional
- Verify calculations with the Federal Inland Revenue Service (FIRS)
- The creators are not liable for any financial losses or tax penalties

For official tax information:
- **FIRS Website**: [www.firs.gov.ng](https://www.firs.gov.ng)
- **State Tax Authorities**: For state-specific requirements
- **Licensed Tax Consultants**: For professional advice

## Project Structure

```
tax_calculator/
├── src/
│   ├── components/
│   │   ├── Disclaimer.tsx       # Legal disclaimer component
│   │   ├── TaxInputForm.tsx     # Input form with validation
│   │   └── TaxResults.tsx       # Results display component
│   ├── calculators/
│   │   ├── oldRegime.ts         # Old regime calculations
│   │   ├── newRegime.ts         # New regime calculations
│   │   └── index.ts             # Comparison logic
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles + Tailwind
├── public/                      # Static assets
├── index.html                   # HTML template
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── package.json                 # Dependencies and scripts
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Deductions**: Edit `src/calculators/oldRegime.ts` or `newRegime.ts`
2. **New Input Fields**: Update `src/components/TaxInputForm.tsx` and `src/types.ts`
3. **UI Changes**: Modify component files in `src/components/`
4. **Styling**: Update Tailwind classes or `src/index.css`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

This is a financial calculator - contributions should prioritize accuracy and clarity:
1. Verify all tax calculations against official FIRS documentation
2. Maintain clear, readable code
3. Add TypeScript types for new features
4. Test thoroughly with various income levels
5. Update documentation

## License

This project is provided as-is for educational and informational purposes.

## Acknowledgments

- Tax brackets based on Nigerian Tax Law (2026 Reform)
- Built with React, TypeScript, and Tailwind CSS
- Hosted using Vite for optimal performance

## Support & Issues

For questions or issues with the calculator:
1. Check the disclaimer and FAQ sections
2. Verify your inputs are correct
3. Consult official FIRS resources
4. Seek professional tax advice if needed

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Based on**: Nigerian Tax Law (2026 Reform)
