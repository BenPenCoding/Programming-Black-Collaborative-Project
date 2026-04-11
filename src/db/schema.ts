import { pgTable, text, integer, timestamp,serial } from "drizzle-orm/pg-core";

// look at foreign key on delete 

// Define the expense table schema



// Define the user table schema
export const usersTable = pgTable('users', {
  userID: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstName: text('first_name').notNull(), // ts convention and sql convention 
  lastname: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull()

});
export const expensesTable = pgTable('expenses', {
  userExpensesID: integer('user_expenses_id').references(() => usersTable.userID).notNull(),
  expensesID: integer('id').primaryKey().generatedAlwaysAsIdentity(), 
  expensesName: text('expenses_name').notNull(), // ts convention and sql convention 
  dateAdded: timestamp('date_added').notNull(),
  description: text('description').notNull(),
  

});



