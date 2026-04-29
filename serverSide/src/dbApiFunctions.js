"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser = AddUser;
exports.AddExpense = AddExpense;
exports.AddIncome = AddIncome;
exports.getUserRecord = getUserRecord;
exports.getExpenseRecord = getExpenseRecord;
exports.getIncomeRecord = getIncomeRecord;
exports.getUsersExpenses = getUsersExpenses;
exports.getUsersIncomes = getUsersIncomes;
exports.updateExpenseRecord = updateExpenseRecord;
exports.updateIncomeRecord = updateIncomeRecord;
exports.deleteExpenseRecord = deleteExpenseRecord;
exports.deleteIncomeRecord = deleteIncomeRecord;
exports.deleteUserRecord = deleteUserRecord;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("./db/schema");
const ClassDefinitions_1 = require("../expressSrc/ClassDefinitions");
// I encountered issues when trying to group these under one function so had to leave them as separate
const db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL); // removed export as should only be used internally
function AddUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const userEntry = {
            username: newUser.getUserName(),
            firstName: newUser.getFirstName(),
            lastName: newUser.getLastName(),
            email: newUser.getEmail(),
            hashedPassword: newUser.getHashedPassword(),
            salt: newUser.getSalt()
        };
        const result = yield db.insert(schema_1.usersTable).values(userEntry).returning(); // returns obj usersTable with pk added
        // reassingning the pk to the obj user
        const newUserRow = result[0];
        if (!newUserRow) {
            throw new Error("Cannot Add User");
        }
        else {
            console.log("Successfully added user");
            newUser.setUserId(newUserRow.id);
        }
    });
}
function AddExpense(newExpense) {
    return __awaiter(this, void 0, void 0, function* () {
        const expenseEntry = {
            description: newExpense.getDescription(),
            userId: newExpense.getUserId(),
            name: newExpense.getExpensesName(),
            dateAdded: newExpense.getDateAdded(),
            cost: newExpense.getCost().toString(),
            recurring: newExpense.getRecurring(),
            recurringFreq: newExpense.getRecurringFreq()
        };
        const result = yield db.insert(schema_1.expensesTable).values(expenseEntry).returning();
        // reassining the pk to the obj expense
        const newExpenseRow = result[0];
        if (!newExpenseRow) {
            throw new Error("Cannot Add Expense");
        }
        else {
            console.log("Successfully added expense");
            newExpense.setExpenseId(newExpenseRow.id);
        }
    });
}
function AddIncome(newIncome) {
    return __awaiter(this, void 0, void 0, function* () {
        const incomeEntry = {
            userId: newIncome.getUserId(),
            dateAdded: newIncome.getDateAdded(),
            name: newIncome.getIncomeName(),
            earning: newIncome.getEarning().toString(),
            description: newIncome.getDescription(),
            recurring: newIncome.getRecurring(),
            recurringFreq: newIncome.getRecurringFreq()
        };
        const result = yield db.insert(schema_1.incomesTable).values(incomeEntry).returning();
        const newIncomeRow = result[0];
        if (!newIncomeRow) {
            throw new Error("Cannot add Expres");
        }
        else {
            console.log("Successfully added income");
            newIncome.setIncomeId(newIncomeRow.id);
        }
    });
}
// checks if a user exists using username,password as search queries
function getUserRecord(username) {
    return __awaiter(this, void 0, void 0, function* () {
        // might have to change the userID each time it is called for caching purposes
        const result = yield db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.username, username));
        // returns array of  obj type
        const userRow = result[0];
        if (!userRow) {
            throw new Error("User not in table");
        }
        else {
            const user = new ClassDefinitions_1.User(userRow.firstName, userRow.lastName, userRow.username, userRow.email, userRow.hashedPassword, userRow.salt);
            user.setUserId(userRow.id);
            return user;
        }
    });
}
// returns Expense obj from an expenseId
function getExpenseRecord(expenseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db.select().from(schema_1.expensesTable).where((0, drizzle_orm_1.eq)(schema_1.expensesTable.id, expenseId));
        const expenseRow = result[0];
        if (!expenseRow) {
            throw new Error("Expense not in table ");
        }
        else {
            expenseRow.cost = expenseRow.cost;
            const expense = new ClassDefinitions_1.Expense(expenseRow);
            expense.setExpenseId(expenseRow.id);
            return expense;
        }
    });
}
function getIncomeRecord(incomeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db.select().from(schema_1.incomesTable).where((0, drizzle_orm_1.eq)(schema_1.incomesTable.id, incomeId));
        const incomeRow = result[0];
        if (!incomeRow) {
            throw new Error("Expense not in table ");
        }
        else {
            const income = new ClassDefinitions_1.Income(incomeRow);
            income.setIncomeId(incomeRow.id);
            return income;
        }
    });
}
function getUsersExpenses(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db.select().from(schema_1.expensesTable).where((0, drizzle_orm_1.eq)(schema_1.expensesTable.userId, userId));
        if (result.length == 0) {
            return [];
        }
        else {
            // Map result into expense class
            const ExpenseClassResult = [];
            console.log(result.length);
            for (let i = 0; i < result.length; i++) {
                let expenseRow = result[i];
                let expense = new ClassDefinitions_1.Expense(expenseRow);
                expense.setExpenseId(expenseRow.id);
                ExpenseClassResult.push(expense);
            }
            return ExpenseClassResult;
        }
    });
}
function getUsersIncomes(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db.select().from(schema_1.incomesTable).where((0, drizzle_orm_1.eq)(schema_1.incomesTable.userId, userId));
        if (result.length == 0) {
            return [];
        }
        else {
            // Map result into income class
            const incomeClassResult = [];
            for (let i = 0; i < result.length; i++) {
                let incomeRow = result[i];
                let income = new ClassDefinitions_1.Income(incomeRow);
                income.setIncomeId(incomeRow.id);
                incomeClassResult.push(income);
            }
            return incomeClassResult;
        }
    });
}
function updateExpenseRecord(expense) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.update(schema_1.expensesTable)
            .set({
            description: expense.getDescription(),
            userId: expense.getUserId(),
            name: expense.getExpensesName(),
            dateAdded: expense.getDateAdded(),
            cost: expense.getCost().toString(),
            recurring: expense.getRecurring(),
            recurringFreq: expense.getRecurringFreq()
        })
            .where((0, drizzle_orm_1.eq)(schema_1.expensesTable.id, expense.getExpenseId()));
    });
}
function updateIncomeRecord(income) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.update(schema_1.incomesTable)
            .set({
            userId: income.getUserId(),
            dateAdded: income.getDateAdded(),
            name: income.getIncomeName(),
            earning: income.getEarning().toString(),
            description: income.getDescription(),
            recurring: income.getRecurring(),
            recurringFreq: income.getRecurringFreq()
        })
            .where((0, drizzle_orm_1.eq)(schema_1.incomesTable.id, income.getIncomeId()));
    });
}
// I encountered issues when trying to group these under one function so had to leave them as separate
function deleteExpenseRecord(expenseID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.delete(schema_1.expensesTable).where((0, drizzle_orm_1.eq)(schema_1.expensesTable.id, expenseID));
    });
}
function deleteIncomeRecord(incomeID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.delete(schema_1.incomesTable).where((0, drizzle_orm_1.eq)(schema_1.incomesTable.id, incomeID));
    });
}
function deleteUserRecord(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, userID));
    });
}
/*
const user1 = new User("Elliot","Sainsbury","ejs","zfdf791@durham.ac.uk","DBPass")
user1.setUserId(6)
const expense1 = new Expense("Expense1",100,new Date(18,4,2026),"desciprtionfield",user1.getUserId())
const income1 = new Income("income1",50,user1.getUserId(),new Date(18,4,2026))
*/
