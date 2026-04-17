import { pgTable, text, integer, timestamp,numeric } from "drizzle-orm/pg-core";

// look at foreign key on delete 

// Define the expense table schema



// Define the user table schema
export const usersTable = pgTable('users', {
  userId: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  username: text('user_name').notNull(), // ts convention and sql convention 
  firstName: text('first_name').notNull(), // ts convention and sql convention 
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(), 
  password: text('password').notNull()

});
export const expensesTable = pgTable('expenses', {
  userId: integer('user_id').references(() => usersTable.userId).notNull(),
  expenseId: integer('id').primaryKey().generatedAlwaysAsIdentity(), 
  expenseName: text('expenses_name').notNull(), // ts convention and sql convention 
  dateAdded: timestamp('date_added').notNull(),
  description: text('description').notNull(),
  cost:  numeric('cost').notNull()
  
});

export const incomeTable = pgTable('incomes',{
  userId: integer('user_id').references(() => usersTable.userId).notNull(),
  incomeName: text('expenses_name').notNull(), // ts convention and sql convention 
  incomeId: integer('id').primaryKey().generatedAlwaysAsIdentity(), 
  earning:  numeric('cost').notNull(),
  dateAdded: timestamp('date_added').notNull(),


})

