import { pgTable, text, integer, timestamp,numeric,boolean } from "drizzle-orm/pg-core";


// Define the expense table schema



// Define the user table schema
export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(), //db itself generates pk
  username: text('user_name').notNull(), // ts convention and sql convention 
  firstName: text('first_name').notNull(), // 
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(), 
  hashedPassword: text('hashedPassword').notNull(),
  salt: text('salt').notNull()

});
export const expensesTable = pgTable('expenses', {
  userId: integer('user_id').references(() => usersTable.id,{onDelete : "cascade"}).notNull(),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(), 
  name: text('expenses_name').notNull(), // ts convention and sql convention 
  dateAdded: timestamp('date_added').notNull(),
  description: text('description').notNull(),
  cost:  numeric('cost').notNull(),
  recurring: boolean('recurring').notNull(),
  recurringFreq: integer('recurringFreq').notNull()
  
});

export const incomesTable = pgTable('incomes',{
  userId: integer('user_id').references(() => usersTable.id,{onDelete : "cascade"}).notNull(),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('incomes_names').notNull(), // ts convention and sql convention 
  earning:  numeric('cost').notNull(),
  dateAdded: timestamp('date_added').notNull(),
  description: text('description').notNull(),
  recurring: boolean('recurring').notNull(),
  recurringFreq: integer('recurringFreq').notNull()

})

