import React, { useState } from 'react'
import { Stack,Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import AddBudgetModal from './component/AddBudgetModal';
import AddExpenseModal from './component/AddExpenseModal';
import BudgetCard from "./component/BudgetCard";
import TotalBudgetCard from './component/TotalBudgetCard';
import UncategorizedBudgetCard from './component/UncategorizedBudgetCard';
import { BudgetsProvider } from './context/BudgetsContext';
import { useBudgets } from "./context/BudgetsContext"

function App() {
  
  const { budgets, getBudgetExpenses } = useBudgets()
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [setdefaultBudgetId, setDefaultBudgetId] =useState()
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

  function openAddExpenseBudgetId(budgetId){
    setShowAddExpenseModal(true)
    setDefaultBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' 
          onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
            </Button>

          <Button variant='outline-primary'
          onClick={openAddExpenseBudgetId} 
          >
            Add Expense
          </Button>
        </Stack>
        <div style={{display:'grid', 
        gridTemplateColumns:'repeat(auto-fill,minmax(300px, 1fr))',
        gap:'1rem',
        alignItems:'flex-start'}}>

            {budgets.map(budget => {

                const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
                )
                
                return <BudgetCard

                key={budget.id}
                name={budget.name}
                amount = { amount }
                max={ budget.max } 
                onAddExpenseClick = 
                {() => openAddExpenseBudgetId(budget.id)}
                />
                
            })}

            <UncategorizedBudgetCard onClick={openAddExpenseBudgetId}  />
            <TotalBudgetCard/>
           
          </div>
      </Container>
      <AddBudgetModal 
        showBudget={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
       />
        
      <AddExpenseModal 
        defaultBudgetId = {setdefaultBudgetId}
        showExpense = {showAddExpenseModal}
        handleClose = {() => setShowAddExpenseModal(false)} />
    </>
  );
}

export default App;

