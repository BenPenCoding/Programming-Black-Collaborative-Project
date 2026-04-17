import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable,expensesTable } from './db/schema';
import {User,Expense} from '../expressSrc/ClassDefinitions'
import { error } from 'node:console';
  
const db = drizzle(process.env.DATABASE_URL!);

export async function AddUser(newUser: User){
  const userEntry : typeof usersTable.$inferInsert = {
    firstName : newUser.getFirstName(),
    lastname : newUser.getLastName(),
    email : newUser.getEmail(),
    password : newUser.getPassword()

  };
  const result = await db.insert(usersTable).values(userEntry).returning();
  console.log("New User created");

  // reassingning the pk to the obj user
  const newUserRow = result[0]
  if(!newUserRow){
    throw error()
  }
  else{
    newUser.setUserId(newUserRow.userID) 

  }
  
}

export async function AddExpense(newExpense:Expense){
  const expenseEntry: typeof expensesTable.$inferInsert = {
    description : newExpense.getDescription(),
    userId: newExpense.getUserId(),
    expensesName : newExpense.getDescription(),
    dateAdded : newExpense.getDateAdded(),
    cost : newExpense.getCost().toString()
  }
  const result = await db.insert(expensesTable).values(expenseEntry).returning();
  console.log("New Expense created");

  // reassining the pk to the obj expense
  const newExpenseRow = result[0];
  if(!newExpenseRow){
    throw error()
  }
  else{
    newExpense.setExpenseId(newExpenseRow.expenseID)
  }
}


export async function getUserRecord(userId: number ): Promise< typeof usersTable.$inferSelect | Error>{
  const result =  await db.select().from(usersTable).where(eq(usersTable.userID,userId))
  // returns array of  obj type
  const userRow = result[0];
  if(!userRow){
    throw new Error("record not found")
  }
  else{
    return userRow
  }

}

export async function getExpenseRecord(expenseId: number): Promise<typeof expensesTable.$inferSelect | Error>{
  const result = await db.select().from(expensesTable).where(eq(expensesTable.expenseID,expenseId));
  const expenseRow = result[0];
  if(!expenseRow){
    throw new Error("record not found")
  }
  else{
    return expenseRow
  }

}