import { Stack, Form, Modal, Button } from "react-bootstrap"

import { BudgetsProvider, UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext"
import { currencyFormatter } from "../utils"

export default function ViewExpenseModal({ budgetId, handleClose }) {
  
  const { expenses, budgets, deleteBudget, deleteExpense, getBudgetExpenses } = useBudgets()

  const budget = budgetId === UNCATEGORIZED_BUDGET_ID ?
  {name:"Uncategorized",id:UNCATEGORIZED_BUDGET_ID}:
  budgets.find((budget) => budget.id === budgetId)
  

  return (
    <Modal show={ budgetId != null } onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
                <div>Expense - {budget?.name}</div>
                {
                  budgetId !== UNCATEGORIZED_BUDGET_ID && 
                  (
                    <Button onClick={() => deleteBudget(budget)} variant = "outline-danger">delete</Button>
                  )
                }
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body direction="vertical">
                {getBudgetExpenses(budgetId).map(expense => 
                <div key= {expense.id}>
                  <Stack direction="horizontal" gap="2">
                    <div >{expense.description} </div>
                    <div>{currencyFormatter.format(expense.amount)} </div>

                    <Button  onClick={() => deleteExpense(expense)} className="ms-auto" variant="outline-none" >x</Button>
                  </Stack>
                  </div>)
                }
                
        </Modal.Body>
    </Modal>
  )
}
