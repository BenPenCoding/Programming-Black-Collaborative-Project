import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq,and } from 'drizzle-orm';
import { usersTable,expensesTable } from './db/schema';
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
  const result = await db.insert(usersTable).values(userEntry).returning();

  // reassingning the pk to the obj user
  const newUserRow = result[0]
  if(!newUserRow){
    throw new Error("Cannot Add User")
  }
  else{
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
  console.log("New Expense created");

  // reassining the pk to the obj expense
  const newExpenseRow = result[0];
  if(!newExpenseRow){
    throw new Error("Cannot Add Expense")
  }
  else{
    newExpense.setExpenseId(newExpenseRow.expenseId)
  }
}


export async function getUserRecord(username: string,password : string ): Promise<  User  >{
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

export async function getExpenseRecord(expenseId: number): Promise<typeof expensesTable.$inferSelect | Error>{
  const result = await db.select().from(expensesTable).where(eq(expensesTable.expenseId,expenseId));
  const expenseRow = result[0];
  if(!expenseRow){
    throw new Error("Expense not in table ")
  }
  else{
    return expenseRow
  }

}