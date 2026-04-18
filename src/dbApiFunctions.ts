import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq,and } from 'drizzle-orm';
import { usersTable,expensesTable,incomesTable } from './db/schema';
import {User,Expense,Income} from '../expressSrc/ClassDefinitions'

  
export const db = drizzle(process.env.DATABASE_URL!);

export async function AddUser(newUser: User){
  const userEntry : typeof usersTable.$inferInsert = {
    username : newUser.getUserName(),
    firstName : newUser.getFirstName(),
    lastName : newUser.getLastName(),
    email : newUser.getEmail(),
    password : newUser.getPassword()

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
    expenseName : newExpense.getDescription(),
    dateAdded : newExpense.getDateAdded(),
    cost : newExpense.getCost().toString()
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
    earning : newIncome.getEarning().toString()
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

export async function getUserRecord(username: string,password : string ): Promise<  User  >{
  // might have to change the userID each time it is called for caching purposes

  const result =  await db.select().from(usersTable).where(and(eq(usersTable.username,username),eq(usersTable.password,password)))
  // returns array of  obj type
  const userRow = result[0];

  if(!userRow){
    throw new Error("User not in table")
  }
  else{
    const user = new User(userRow.username,userRow.firstName,userRow.lastName,userRow.email,userRow.password);
    user.setUserId(userRow.userId)
    return user
  }

}

export async function getExpenseRecord(expenseId: number): Promise< Expense >{
  const result = await db.select().from(expensesTable).where(eq(expensesTable.expenseId,expenseId));
  const expenseRow = result[0];
  if(!expenseRow){
    throw new Error("Expense not in table ")
  }
  else{
    const expense = new Expense(expenseRow.expenseName,(expenseRow.cost as any) as  number ,expenseRow.dateAdded,expenseRow.description,expenseRow.userId) 
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
    const income = new Income(incomeRow.incomeName,(incomeRow.earning as any ) as number,incomeRow.userId,incomeRow.dateAdded) 
    income.setIncomeId(incomeRow.incomeId)
    return  income 
  }  

}
const user1 = new User("Elliot","Sainsbury","ejs","zfdf791@durham.ac.uk","DBPass")
user1.setUserId(6)
const expense1 = new Expense("Expense1",100,new Date(18,4,2026),"desciprtionfield",user1.getUserId())
const income1 = new Income("income1",50,user1.getUserId(),new Date(18,4,2026))
//AddUser(user1)
//AddExpense(expense1)
//AddIncome(income1)



async function checkgetMethods() {
  const newUser =  await getUserRecord(user1.getUserName(),user1.getPassword())
  console.log(newUser.getUserId())
};
checkgetMethods();
