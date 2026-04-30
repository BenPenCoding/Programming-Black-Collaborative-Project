"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomesTable = exports.expensesTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Define the expense table schema
// Define the user table schema
exports.usersTable = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.integer)('id').primaryKey().generatedAlwaysAsIdentity(), //db itself generates pk
    username: (0, pg_core_1.text)('user_name').notNull(), // ts convention and sql convention 
    firstName: (0, pg_core_1.text)('first_name').notNull(), // 
    lastName: (0, pg_core_1.text)('last_name').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    hashedPassword: (0, pg_core_1.text)('hashedPassword').notNull(),
    salt: (0, pg_core_1.text)('salt').notNull()
});
exports.expensesTable = (0, pg_core_1.pgTable)('expenses', {
    userId: (0, pg_core_1.integer)('user_id').references(() => exports.usersTable.id, { onDelete: "cascade" }).notNull(),
    id: (0, pg_core_1.integer)('id').primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.text)('expenses_name').notNull(), // ts convention and sql convention 
    dateAdded: (0, pg_core_1.timestamp)('date_added').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    cost: (0, pg_core_1.numeric)('cost').notNull(),
    recurring: (0, pg_core_1.boolean)('recurring').notNull(),
    recurringFreq: (0, pg_core_1.integer)('recurringFreq').notNull()
});
exports.incomesTable = (0, pg_core_1.pgTable)('incomes', {
    userId: (0, pg_core_1.integer)('user_id').references(() => exports.usersTable.id, { onDelete: "cascade" }).notNull(),
    id: (0, pg_core_1.integer)('id').primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.text)('incomes_names').notNull(), // ts convention and sql convention 
    earning: (0, pg_core_1.numeric)('cost').notNull(),
    dateAdded: (0, pg_core_1.timestamp)('date_added').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    recurring: (0, pg_core_1.boolean)('recurring').notNull(),
    recurringFreq: (0, pg_core_1.integer)('recurringFreq').notNull()
});
