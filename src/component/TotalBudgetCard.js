import React from 'react'
import { useBudgets } from '../context/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function TotalBudgetCard({}) {
  const {  expenses,budgets } = useBudgets()
    const amount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
    )
    const max = budgets.reduce(
      (total, budget) => total + budget.max,
      0
      )
    if(!amount) return

  return (
    <BudgetCard 
    name="Total"
    amount = { amount }
    gray
    max = { max }
    hideButtons
    />
  )

  }

