/**
 * BMW Financial Services — Hisob-kitob yordamchi funksiyalari
 */

export interface FinanceCalculationInput {
  carPrice: number;
  downPaymentPercent: number; // 20 - 70
  termMonths: number; // 12, 24, 36, 48, 60
  annualInterestRate: number; // e.g. 14.5 (%)
}

export interface FinanceCalculationResult {
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export function calculateFinance({
  carPrice,
  downPaymentPercent,
  termMonths,
  annualInterestRate,
}: FinanceCalculationInput): FinanceCalculationResult {
  const safePrice = Math.max(0, carPrice);
  const safePercent = Math.min(Math.max(downPaymentPercent, 10), 90);
  const safeMonths = Math.max(1, termMonths);
  const safeRate = Math.max(0, annualInterestRate);

  const downPaymentAmount = Math.round((safePrice * safePercent) / 100);
  const loanAmount = Math.max(0, safePrice - downPaymentAmount);

  if (loanAmount === 0 || safeMonths === 0) {
    return {
      downPaymentAmount,
      loanAmount: 0,
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: downPaymentAmount,
    };
  }

  if (safeRate === 0) {
    const monthly = Math.round(loanAmount / safeMonths);
    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment: monthly,
      totalInterest: 0,
      totalPayment: safePrice,
    };
  }

  // Standart annuitet to'lov formulasi: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const monthlyRate = safeRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, safeMonths);
  const monthlyPayment = Math.round((loanAmount * (monthlyRate * factor)) / (factor - 1));

  const totalLoanRepayment = monthlyPayment * safeMonths;
  const totalInterest = Math.max(0, totalLoanRepayment - loanAmount);
  const totalPayment = downPaymentAmount + totalLoanRepayment;

  return {
    downPaymentAmount,
    loanAmount,
    monthlyPayment,
    totalInterest,
    totalPayment,
  };
}

