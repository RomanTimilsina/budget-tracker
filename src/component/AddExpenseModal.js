import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { BudgetsProvider, useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetsContext"

export default function AddExpenseModal({ showExpense, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()

  const { addExpense, budgets } = useBudgets()

  function handleSubmit(e) {

    e.preventDefault()

    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId:budgetIdRef.current.value
    })

       handleClose()
       
  }

  return (
    <Modal show={showExpense} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budget">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              ref={budgetIdRef}
              defaultValue = {defaultBudgetId}
            >
              <option id={UNCATEGORIZED_BUDGET_ID} >Uncategorized</option>
            {
              budgets.map(budget => {
                return <option key={budget.id}
                 value={budget.id}>
                  {budget.name}
                  </option>
              })
            }
            
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}