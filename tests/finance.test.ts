import { test, describe } from 'node:test';
import assert from 'node:assert';
import { calculateFinance } from '../src/lib/financeUtils.js';

describe('BMW Financial Services Utils', () => {
  test('calculates correct monthly payment and down payment for standard loan', () => {
    const result = calculateFinance({
      carPrice: 100000,
      downPaymentPercent: 30,
      termMonths: 36,
      annualInterestRate: 14.5,
    });

    assert.strictEqual(result.downPaymentAmount, 30000);
    assert.strictEqual(result.loanAmount, 70000);
    assert.ok(result.monthlyPayment > 2000 && result.monthlyPayment < 3000);
    assert.ok(result.totalInterest > 0);
    assert.strictEqual(result.totalPayment, result.downPaymentAmount + result.monthlyPayment * 36);
  });

  test('handles 0% interest rate gracefully', () => {
    const result = calculateFinance({
      carPrice: 60000,
      downPaymentPercent: 50,
      termMonths: 24,
      annualInterestRate: 0,
    });

    assert.strictEqual(result.downPaymentAmount, 30000);
    assert.strictEqual(result.loanAmount, 30000);
    assert.strictEqual(result.monthlyPayment, 1250);
    assert.strictEqual(result.totalInterest, 0);
    assert.strictEqual(result.totalPayment, 60000);
  });

  test('clamps edge case down payment percentages safely', () => {
    const minResult = calculateFinance({
      carPrice: 50000,
      downPaymentPercent: 5, // below min 10%
      termMonths: 12,
      annualInterestRate: 10,
    });
    assert.strictEqual(minResult.downPaymentAmount, 5000); // clamped to 10%

    const maxResult = calculateFinance({
      carPrice: 50000,
      downPaymentPercent: 99, // above max 90%
      termMonths: 12,
      annualInterestRate: 10,
    });
    assert.strictEqual(maxResult.downPaymentAmount, 45000); // clamped to 90%
  });
});

