import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div class="container-fluid p-5">
        <div class="row g-5">
            <div class="col-4"><Summary /></div>
            <div class="col-4"><Income /></div>
            <div class="col-4"><Expenses /></div>
        </div>
    </div>
  );
}

function Summary() {
  return (
    <div className="container p-5 my-5 border text-center">
     <h1 className="my-3">Balance</h1>
     <p>£1500</p>
    </div>
  )
}

function Income() {
  return (
    <div className="container p-5 my-5 border text-center">
     <h1 className="my-3">Income</h1>
     <p>£1500</p>
     <NewIncome />
    </div>
  )
}

function NewIncome() {
  return (
    <div className="container border text-start">
      <h3 className="my-3">Add New Income:</h3>
      <IncomeAmount />
      <IncomeType />
      <SubmitIncome />
    </div>
  )
}

function IncomeAmount() {
  return (
    <div className="form-group my-2">
        <label htmlFor="incomeamount" className="form-label">Amount:</label>
        <input type="text" className="form-control" id="incomeamount" placeholder="Enter Income Amount" />
    </div>
  );
}

function IncomeType() {
  return (
    <div className="form-group my-2">
     <label htmlFor="incomeref" className="form-label">Reference:</label>
     <input type="text" className="form-control" id="incomeref" placeholder="Enter Income Reference" />
    </div>
  );
}

function SubmitIncome() {
  return (
    <button type="submit" className="btn btn-primary my-2">Submit</button>
  );
}

function Expenses() {
  return (
    <div className="container p-5 my-5 border text-center">
     <h1 className="my-3">Expenses</h1>
     <p>£1500</p>
     <NewExpense />
    </div>
  )
}

function NewExpense() {
  return (
    <div className="container border text-start">
      <h3 className="my-3">Add New Expense:</h3>
      <ExpenseAmount />
      <ExpenseType />
      <SubmitExpense />
    </div>
  )
}

function ExpenseAmount() {
  return (
    <div className="form-group my-2">
        <label htmlFor="expenseamount" className="form-label">Amount:</label>
        <input type="text" className="form-control" id="expenseamount" placeholder="Enter Expense Amount" />
    </div>
  );
}

function ExpenseType() {
  return (
    <div className="form-group my-2">
     <label htmlFor="expenseref" className="form-label">Reference:</label>
     <input type="text" className="form-control" id="expenseref" placeholder="Enter Expense Reference" />
    </div>
  );
}

function SubmitExpense() {
  return (
    <button type="submit" className="btn btn-primary my-2">Submit</button>
  );
}

export default Dashboard;