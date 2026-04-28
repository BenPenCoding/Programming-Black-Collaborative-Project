import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq,and } from 'drizzle-orm';
import { usersTable,expensesTable,incomesTable } from './db/schema';
import {User,Expense,Income} from '../expressSrc/ClassDefinitions'

  
const db = drizzle(process.env.DATABASE_URL!); // removed export as should only be used internally

export async function AddUser(newUser: User){
  const userEntry : typeof usersTable.$inferInsert = {
    username : newUser.getUserName(),
    firstName : newUser.getFirstName(),
    lastName : newUser.getLastName(),
    email : newUser.getEmail(),
    hashedPassword : newUser.getHashedPassword(),
    salt : newUser.getSalt()

  };
  const result = await db.insert(usersTable).values(userEntry).returning(); // returns obj usersTable with pk added

  // reassingning the pk to the obj user
  const newUserRow = result[0]
  if(!newUserRow){
    throw new Error("Cannot Add User")
  }
  else{
    console.log("Successfully added user");
    newUser.setUserId(newUserRow.userId) 

  }
  
}

export async function AddExpense(newExpense:Expense){
  const expenseEntry: typeof expensesTable.$inferInsert = {
    description : newExpense.getDescription(),
    userId: newExpense.getUserId(),
    expenseName : newExpense.getExpensesName(),
    dateAdded : newExpense.getDateAdded(),
    cost : newExpense.getCost().toString(),
    recurring : newExpense.getRecurring(),
    recurringFreq : newExpense.getRecurringFreq()

  }
  const result = await db.insert(expensesTable).values(expenseEntry).returning();

  // reassining the pk to the obj expense
  const newExpenseRow = result[0];
  if(!newExpenseRow){
    throw new Error("Cannot Add Expense")
  }
  else{
    console.log("Successfully added expense")
    newExpense.setExpenseId(newExpenseRow.expenseId)
  }
}

export async function AddIncome(newIncome: Income){
  const incomeEntry : typeof incomesTable.$inferInsert = {
    userId : newIncome.getUserId(),
    dateAdded : newIncome.getDateAdded(),
    incomeName : newIncome.getIncomeName(),
    earning : newIncome.getEarning().toString(),
    description : newIncome.getDescription(),
    recurring : newIncome.getRecurring(),
    recurringFreq : newIncome.getRecurringFreq()
  }
  const result = await db.insert(incomesTable).values(incomeEntry).returning();
  const newIncomeRow = result[0];
  if(!newIncomeRow){
    throw new Error("Cannot add Expres")
  }
  else{
    console.log("Successfully added income")
    newIncome.setIncomeId(newIncomeRow.incomeId)
  }
}


// checks if a user exists using username,password as search queries
export async function getUserRecord(username: string ): Promise<  User  >{ 
  // might have to change the userID each time it is called for caching purposes

  const result =  await db.select().from(usersTable).where(and(eq(usersTable.username,username)))
  // returns array of  obj type
  const userRow = result[0];

  if(!userRow){
    throw new Error("User not in table")
  }
  else{
    const user = new User(userRow.username,userRow.firstName,userRow.lastName,userRow.email,userRow.hashedPassword,userRow.salt);
    user.setUserId(userRow.userId)
    return user
  }

}

// returns Expense obj from an expenseId
export async function getExpenseRecord(expenseId: number): Promise< Expense >{
  const result = await db.select().from(expensesTable).where(eq(expensesTable.expenseId,expenseId));
  const expenseRow = result[0];
  if(!expenseRow){
    throw new Error("Expense not in table ")
  }
  else{
    const expense = new Expense(expenseRow.expenseName,(expenseRow.cost as any) as  number ,expenseRow.dateAdded,expenseRow.description,expenseRow.userId,expenseRow.recurring,expenseRow.recurringFreq) 
    expense.setExpenseId(expenseRow.expenseId)
    return  expense 
  }

}


export async function getIncomeRecord(incomeId: number): Promise< Income >{
  const result = await db.select().from(incomesTable).where(eq(incomesTable.incomeId,incomeId));
  const incomeRow = result[0];
  if(!incomeRow){
    throw new Error("Expense not in table ")
  }
  else{
    const income = new Income(incomeRow.incomeName,(incomeRow.earning as any ) as number,incomeRow.userId,incomeRow.dateAdded,incomeRow.description,incomeRow.recurring,incomeRow.recurringFreq) 
    income.setIncomeId(incomeRow.incomeId)
    return  income 
  }  

}


export async function getUsersExpenses(userId:number): Promise<Expense[]>{
  const result = await db.select().from(expensesTable).where(eq(expensesTable.userId,userId))
  if(result.length == 0){
    throw new Error("")

  }
  else{
    // Map result into expense class

    const ExpenseClassResult = []
    console.log(result.length)
    for(let i : number = 0; i < result.length;i++){
      let expenseRow = result[i]
      let expense = new Expense(expenseRow.expenseName,(expenseRow.cost as any) as  number ,expenseRow.dateAdded,expenseRow.description,expenseRow.userId,expenseRow.recurring,expenseRow.recurringFreq) 
      expense.setExpenseId(expenseRow.expenseId)
      ExpenseClassResult.push(expense)
    }
    return ExpenseClassResult
  }
}
export async function getUsersIncomes(userId:number): Promise<Income[]>{
  const result = await db.select().from(incomesTable).where(eq(incomesTable.userId,userId))
  if(result.length == 0){
    throw new Error("")

  }
  else{
    // Map result into income class

    const incomeClassResult = []
    for(let i : number = 0; i < result.length;i++){
      let incomeRow = result[i]
      let income = new Income(incomeRow.incomeName,(incomeRow.earning as any ) as number,incomeRow.userId,incomeRow.dateAdded,incomeRow.description,incomeRow.recurring,incomeRow.recurringFreq) 
      income.setIncomeId(incomeRow.incomeId)
      incomeClassResult.push(income)
    }
    return incomeClassResult
  }
}


export async function updateIncomeRecord(expenseId : number){

}


/*
const user1 = new User("Elliot","Sainsbury","ejs","zfdf791@durham.ac.uk","DBPass")
user1.setUserId(6)
const expense1 = new Expense("Expense1",100,new Date(18,4,2026),"desciprtionfield",user1.getUserId())
const income1 = new Income("income1",50,user1.getUserId(),new Date(18,4,2026))
*/
