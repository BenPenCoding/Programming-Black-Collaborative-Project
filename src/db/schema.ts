import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";


// Define the expense table schema
export const expense = pgTable('expenses', {
  userExpensesID: integer('user_expenses_id').references(() => user.userExpensesID),
  expensesID: integer('id').primaryKey(),
  expensesName: text('expenses_name').notNull(), // ts convention and sql convention 
  dateAdd: timestamp('date_Added'),
  description: text('description'),
  

});




// Define the user table schema
export const user = pgTable('user', {
  userExpensesID: integer('id').primaryKey(),
  firstName: text('first_name').notNull(), // ts convention and sql convention 
  lastname: text('last_name').notNull(),
  email: text('email'),
  password: text('password')

});

// Create a type for book records based on the schema
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

// Create a type for book records based on the schema
export type expense1 = typeof expense.$inferSelect;


