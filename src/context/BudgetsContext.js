import React,{ useContext, useState } from "react"
import {v4 as uuidV4} from 'uuid'

const BudgetsContext = React.createContext()

export function useBudgets(){
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {

  const [budgets,setBudget] = useState([])
  const [expenses,setExpense] = useState([])

  function getBudgetExpenses(budgetId){
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
    function addExpense({budgetId,amount,description}){
      setExpense(prev =>{
        
        return [...prev , {id:uuidV4(),budgetId,amount,description}]
      })
    }

    function addBudget({name,max}){
      setBudget(prev =>{
        if(prev.find(budget => budget.name === name)){
          return prev
        }
        return [...prev , {id:uuidV4(),name:name,max:max}]
      })
    }

    function deleteBudget({id}){
      setBudget(prev => {
        return prev.filter(budget => budget.id !== id)
      })
    }

    function deleteExpense({id}){
      setExpense(prev => {
        return prev.filter(expense => expense.id !== id)
      })
    }

    return (
      <BudgetsContext.Provider
        value={{
          budgets,
          expenses,
          getBudgetExpenses,
          addExpense,
          addBudget,
          deleteBudget,
          deleteExpense,
        }}
      >
        {children}
      </BudgetsContext.Provider>
    )
  }
  
