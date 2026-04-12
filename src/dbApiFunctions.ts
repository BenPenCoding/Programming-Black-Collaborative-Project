import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable,expensesTable } from './db/schema.ts';
import {User,Expense} from "../express/ClassDefinitions"
  
const db = drizzle(process.env.DATABASE_URL!);

async function AddUser(newUser: User){
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
  newUser.setUserId(newUserRow.userID) 
  


}

async function AddExpense(newExpense:Expense){
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
  newExpense.setExpenseId(newExpenseRow.expenseID)
}

AddUser(new User("Elliot","Sainsbury","zfdf79@durham.ac.uk","Dbpass"));