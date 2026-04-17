import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [incomeamount, setIncomeAmount] = useState("");
  const [incomeref, setIncomeRef] = useState("");
  const [expenseamount, setExpenseAmount] = useState("");
  const [expenseref, setExpenseRef] = useState("");
  const [errorIncome, setErrorIncome] = useState("");
  const [errorExpense, setErrorExpense] = useState("");

  const handleNewIncome = async (event) => {
    event.preventDefault();
    
    try {
      if (!incomeamount || !incomeref) {
        setErrorIncome("Please fill in all fields");
        return;
      }

      const response = await fetch("/api/newincome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          incomeamount,
          incomeref
        })
    });

      const respNewIncome = await response.json();

      if (response.ok) {
        setIncomeAmount("");
        setIncomeRef("");  
      } else {
        setErrorIncome(respNewIncome.message);
      }

    } catch (errorIncome) {
      setErrorIncome("Something went wrong");
      console.error(errorIncome);
  }
  };

  const handleNewExpense = async (event) => {
    event.preventDefault();
    
    try {
      if (!expenseamount || !expenseref) {
        setErrorExpense("Please fill in all fields");
        return;
      }

      const response = await fetch("/api/newexpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          expenseamount,
          expenseref
        })
    });

      const respNewExpense = await response.json();

      if (response.ok) {
        setExpenseAmount("");
        setExpenseRef("");      
      } else {
        setErrorExpense(respNewExpense.message);
      }

    } catch (errorExpense) {
      setErrorExpense("Something went wrong");
      console.error(errorExpense);
  }
  };

  return (
    <div className="container-fluid p-5">
        <div className="row g-5">
            <div className="col-4"><Summary /></div>
            <div className="col-4"><Income incomeamount={incomeamount} setIncomeAmount={setIncomeAmount} incomeref={incomeref} setIncomeRef={setIncomeRef} handleNewIncome={handleNewIncome} error={errorIncome} /></div>
            <div className="col-4"><Expenses expenseamount={expenseamount} setExpenseAmount={setExpenseAmount} expenseref={expenseref} setExpenseRef={setExpenseRef} handleNewExpense={handleNewExpense} error={errorExpense} /></div>
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

function Income({incomeamount, setIncomeAmount, incomeref, setIncomeRef, handleNewIncome, error}) {
  return (
    <div className="container p-5 my-5 border text-center">
     <h1 className="my-3">Income</h1>
     <p>£1500</p>
     <NewIncome incomeamount={incomeamount} setIncomeAmount={setIncomeAmount} incomeref={incomeref} setIncomeRef={setIncomeRef} handleNewIncome={handleNewIncome} error={error} />
    </div>
  )
}

function NewIncome({incomeamount, setIncomeAmount, incomeref, setIncomeRef, handleNewIncome, error}) {
  return (
    <form onSubmit={handleNewIncome} className="container border text-start">
      <h3 className="my-3">Add New Income:</h3>
      <IncomeAmount incomeamount={incomeamount} setIncomeAmount={setIncomeAmount} />
      <IncomeRef incomeref={incomeref} setIncomeRef={setIncomeRef} />
      
      {error && <p className="text-danger">{error}</p>}
      
      <SubmitIncome />
    </form>
  )
}

function IncomeAmount({incomeamount, setIncomeAmount}) {
  return (
    <div className="form-group my-2">
        <label htmlFor="incomeamount" className="form-label">Amount:</label>
        <input type="text" className="form-control" id="incomeamount" placeholder="Enter Income Amount" value={incomeamount} onChange={(event) => setIncomeAmount(event.target.value)} />
    </div>
  );
}

function IncomeRef({incomeref, setIncomeRef}) {
  return (
    <div className="form-group my-2">
     <label htmlFor="incomeref" className="form-label">Reference:</label>
     <input type="text" className="form-control" id="incomeref" placeholder="Enter Income Reference" value={incomeref} onChange={(event) => setIncomeRef(event.target.value)} />
    </div>
  );
}

function SubmitIncome() {
  return (
    <button type="submit" className="btn btn-primary my-2">Submit</button>
  );
}

function Expenses({expenseamount, setExpenseAmount, expenseref, setExpenseRef, handleNewExpense, error}) {
  return (
    <div className="container p-5 my-5 border text-center">
     <h1 className="my-3">Expenses</h1>
     <p>£1500</p>
     <NewExpense expenseamount={expenseamount} setExpenseAmount={setExpenseAmount} expenseref={expenseref} setExpenseRef={setExpenseRef} handleNewExpense={handleNewExpense} error={error} />
    </div>
  )
}

function NewExpense({expenseamount, setExpenseAmount, expenseref, setExpenseRef, handleNewExpense, error}) {
  return (
    <form onSubmit={handleNewExpense} className="container border text-start">
      <h3 className="my-3">Add New Expense:</h3>
      <ExpenseAmount expenseamount={expenseamount} setExpenseAmount={setExpenseAmount} />
      <ExpenseRef expenseref={expenseref} setExpenseRef={setExpenseRef} />
      
      {error && <p className="text-danger">{error}</p>}

      <SubmitExpense />
    </form>
  )
}

function ExpenseAmount({expenseamount, setExpenseAmount}) {
  return (
    <div className="form-group my-2">
        <label htmlFor="expenseamount" className="form-label">Amount:</label>
        <input type="text" className="form-control" id="expenseamount" placeholder="Enter Expense Amount" value={expenseamount} onChange={(event) => setExpenseAmount(event.target.value)} />
    </div>
  );
}

function ExpenseRef({expenseref, setExpenseRef}) {
  return (
    <div className="form-group my-2">
     <label htmlFor="expenseref" className="form-label">Reference:</label>
     <input type="text" className="form-control" id="expenseref" placeholder="Enter Expense Reference" value={expenseref} onChange={(event) => setExpenseRef(event.target.value)} />
    </div>
  );
}

function SubmitExpense() {
  return (
    <button type="submit" className="btn btn-primary my-2">Submit</button>
  );
}

export default Dashboard;