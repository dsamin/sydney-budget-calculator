import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Slider from '@mui/material/Slider';

// Utility function to calculate approximate Australian tax for a given annual income
function calculateTax(income) {
  let tax = 0;

  // 0 – 18,200: 0%
  let remaining = income;

  // Bracket 1
  if (remaining > 18200) {
    remaining -= 18200;
  } else {
    return tax;
  }

  // 18,201 – 45,000: 19%
  if (remaining > (45000 - 18200)) {
    tax += (45000 - 18200) * 0.19;
    remaining -= (45000 - 18200);
  } else {
    tax += remaining * 0.19;
    return tax;
  }

  // 45,001 – 120,000: 32.5%
  if (remaining > (120000 - 45000)) {
    tax += (120000 - 45000) * 0.325;
    remaining -= (120000 - 45000);
  } else {
    tax += remaining * 0.325;
    return tax;
  }

  // 120,001 – 180,000: 37%
  if (remaining > (180000 - 120000)) {
    tax += (180000 - 120000) * 0.37;
    remaining -= (180000 - 120000);
  } else {
    tax += remaining * 0.37;
    return tax;
  }

  // 180,001+: 45%
  if (remaining > 0) {
    tax += remaining * 0.45;
  }

  return tax;
}

export default function RajeevBudgetCalculator() {
  const [annualIncome, setAnnualIncome] = useState(450000);

  // Each expense is monthly
  const [expenses, setExpenses] = useState([
    { name: 'Water', value: 100, min: 0, max: 1000, emoji: '💧' },
    { name: 'Train', value: 250, min: 0, max: 1000, emoji: '🚆' },
    { name: 'Electricity', value: 70, min: 0, max: 1000, emoji: '⚡' },
    { name: 'Gas', value: 100, min: 0, max: 1000, emoji: '🔥' },
    { name: 'Internet', value: 110, min: 0, max: 1000, emoji: '🌐' },
    { name: 'Strata', value: 200, min: 0, max: 2000, emoji: '🏠' },
    { name: 'Council', value: 130, min: 0, max: 1000, emoji: '🏛️' },
    { name: 'Bupa', value: 240, min: 0, max: 1000, emoji: '💉' },
    { name: 'Car', value: 250, min: 0, max: 2000, emoji: '🚗' },
    { name: 'Gym', value: 100, min: 0, max: 1000, emoji: '🏋️' },
    // New customizable categories
    { name: 'Food', value: 400, min: 0, max: 2000, emoji: '🍔' },
    { name: 'Entertainment', value: 100, min: 0, max: 2000, emoji: '🎉' },
    { name: 'Kids', value: 200, min: 0, max: 2000, emoji: '🧸' },
    { name: 'Clothes', value: 150, min: 0, max: 2000, emoji: '👕' },
  ]);

  // Calculate annual tax
  const tax = calculateTax(annualIncome);
  const netAnnualIncome = annualIncome - tax;
  const netMonthlyIncome = netAnnualIncome / 12;

  // Summation of monthly expenses
  const totalMonthlyExpenses = expenses.reduce((sum, exp) => sum + exp.value, 0);

  // Monthly savings
  const monthlySavings = netMonthlyIncome - totalMonthlyExpenses;

  const handleSliderChange = (index, newValue) => {
    const updated = [...expenses];
    updated[index].value = newValue;
    setExpenses(updated);
  };

  return (
    <motion.div
      className="p-4 grid grid-cols-1 gap-4 min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-600 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center">🚀 Rajeev Budget Calculator 🎉</h1>
      <Card className="p-4 shadow-2xl rounded-2xl bg-white text-black max-w-3xl mx-auto">
        <CardContent>
          <div className="mb-4">
            <label className="block font-semibold mb-2">💰 Annual Income (AUD): {annualIncome.toLocaleString()}</label>
            <Slider
              value={annualIncome}
              min={50000}
              max={500000}
              step={10000}
              onChange={(e, val) => setAnnualIncome(val)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenses.map((expense, index) => (
              <div key={expense.name} className="mb-4 p-2 border rounded-xl bg-gray-100">
                <label className="block font-semibold">
                  {expense.emoji} {expense.name}: ${expense.value}
                </label>
                <Slider
                  value={expense.value}
                  min={expense.min}
                  max={expense.max}
                  step={10}
                  onChange={(e, val) => handleSliderChange(index, val)}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="mb-1">🧮 Approximate Annual Tax: ${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className="mb-1">🏦 Net Annual Income: ${netAnnualIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className="mb-1">💸 Total Monthly Expenses: ${totalMonthlyExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className="mt-2 font-bold">💲 Estimated Monthly Savings: ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
