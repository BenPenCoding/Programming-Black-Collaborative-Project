"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
// Import the express in typescript file
const express_1 = __importDefault(require("express")); //Request, Response,NextFunction used for error handling
const crypto = __importStar(require("crypto"));
const dbAPI = __importStar(require("../src/dbApiFunctions")); // functions for inserting data into neon db
const ClassDefinitions_1 = require("./ClassDefinitions");
// Initialize the express engine
// might have to wrap parse request in try catches
const app = (0, express_1.default)();
app.use(express_1.default.static('./../../client'));
function hashPassword(password) {
    // Generate a random salt (16 bytes)
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    // Return both salt and hash for storage
    return { salt, hash };
}
function verifyPassword(password, salt, hash) {
    const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
    return hashedPassword === hash;
}
// Example usage
// middleware`
app.use(express_1.default.json());
// cached user token map
/*
Due to the constraints or free tier hosting of the backend and the database i implemented a cache system
to minimise requests.
*/
const tokenDictionary = {};
// hard coding auth token for testing
// POST Routes
app.post('/api/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body; //  parsing request body
        // check if username or password is empty
        if (!username || !password) {
            // client issue so do not send to general error handler
            return res.status(400).json({ error: "Bad Request" });
        }
        const cachedUser = yield dbAPI.getUserRecord(username); //  checking to see if in the db, userID updated  via return statement
        if (!verifyPassword(password, cachedUser.getSalt(), cachedUser.getHashedPassword())) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        // create an auth token
        const token = crypto.randomBytes(16).toString('hex');
        tokenDictionary[token] = cachedUser;
        return res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
}));
app.post('/api/signUp', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ error: "Bad Request" });
        }
        const { salt, hash } = hashPassword(password);
        const newUser = new ClassDefinitions_1.User(firstName, lastName, username, email, hash, salt);
        yield dbAPI.AddUser(newUser); // userID updated  via return statement
        const token = crypto.randomBytes(16).toString('hex');
        tokenDictionary[token] = newUser;
        return res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
}));
app.post('/api/updateExpense', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { expensesName, cost, dateAdded, description, userId, id, recurring, recurringFreq } = req.body;
        const token = req.headers.token;
        if (!(token in tokenDictionary)) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        if (user.getUserId() != userId) {
            return res.status(401).json({ error: " Unauthorised Access" });
        }
        const expense = yield dbAPI.getExpenseRecord(id);
        if (expense.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" });
        }
        if (expense.getExpensesName() != expensesName && expensesName != null) {
            expense.setExpensesName(expensesName);
        }
        if (expense.getCost() != cost && cost) {
            expense.setCost(cost);
        }
        if (expense.getDateAdded() != dateAdded && dateAdded != null) {
            expense.setDateAdded(dateAdded);
        }
        if (expense.getDescription() != description && description != null) {
            expense.setDescription(description);
        }
        if (expense.getRecurring() != recurring && recurring != null) {
            expense.setRecurring(recurring);
        }
        if (expense.getRecurringFreq() != recurringFreq && recurringFreq != null) {
            expense.setRecurringFreq(recurringFreq);
        }
        yield dbAPI.updateExpenseRecord(expense);
        res.status(200).send({ response: "successfully updated expense" });
    }
    catch (error) {
        next(error);
    }
}));
app.post('/api/updateIncome', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // write in api doc this order
        const { incomeName, earning, userId, id, dateAdded, description, recurring, recurringFreq } = req.body;
        const token = req.headers.token;
        if (!(token in tokenDictionary)) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        if (user.getUserId() != userId) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const income = yield dbAPI.getIncomeRecord(id);
        if (income.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" });
        }
        if (income.getIncomeName() != incomeName && incomeName != null) {
            income.setIncomeName(incomeName);
        }
        if (income.getEarning() != earning && earning != null) {
            income.setEarning(earning);
        }
        if (income.getDateAdded() != dateAdded && dateAdded != null) {
            income.setDateAdded(dateAdded);
        }
        if (income.getDescription() != description && description != null) {
            income.setDescription(description);
        }
        if (income.getRecurring() != recurring && recurring != null) {
            income.setRecurring(recurring);
        }
        if (income.getRecurringFreq() != recurringFreq && recurringFreq != null) {
            income.setRecurringFreq(recurringFreq);
        }
        yield dbAPI.updateIncomeRecord(income);
        res.status(200).send({ response: "successfully updated income" });
    }
    catch (error) {
        next(error);
    }
}));
app.post("/api/addExpense", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!(token in tokenDictionary)) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        if (user.getUserId() != req.body.userId) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const newExpense = new ClassDefinitions_1.Expense(req.body);
        yield dbAPI.AddExpense(newExpense);
        res.status(200).send({ response: "successfully added expense" });
    }
    catch (error) {
        next(error);
    }
}));
app.post("/api/addIncome", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!(token in tokenDictionary)) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        if (user.getUserId() != req.body.userId) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const newIncome = new ClassDefinitions_1.Income(req.body);
        yield dbAPI.AddIncome(newIncome);
        res.status(200).send({ response: "successfully added income" });
    }
    catch (error) {
        next(error);
    }
}));
// GET Routes
app.get('/api/getUsersExpenses', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!(token in tokenDictionary)) {
            // check to see if it is in the logged in tokenDictionary
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        const ExpensesArr = yield dbAPI.getUsersExpenses(user.getUserId());
        return res.status(200).json(ExpensesArr);
    }
    catch (error) {
        next(error);
    }
}));
app.get('/api/getUsersIncomes', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!(token in tokenDictionary)) {
            // check to see if it is in the logged in tokenDictionary
            return res.status(401).json({ error: "Unauthorised  Access" });
        }
        const user = tokenDictionary[token];
        const IncomesArr = yield dbAPI.getUsersIncomes(user.getUserId());
        return res.status(200).json(IncomesArr);
    }
    catch (error) {
        next(error);
    }
}));
// DELETE Routes
app.delete("/api/deleteExpense", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        const { userId, expenseId } = req.body;
        if (!(token in tokenDictionary)) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        if (user.getUserId() != userId) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const expense = yield dbAPI.getExpenseRecord(expenseId);
        if (expense.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" });
        }
        yield dbAPI.deleteExpenseRecord(expenseId);
        return res.status(200).json({ message: "Successfully deleted the expense" });
    }
    catch (error) {
        next(error);
    }
}));
app.delete("/api/deleteIncome", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        const { userId, incomeId } = req.body;
        if (!(token in tokenDictionary)) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        if (user.getUserId() != userId) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const income = yield dbAPI.getIncomeRecord(incomeId);
        if (income.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" });
        }
        yield dbAPI.deleteIncomeRecord(incomeId);
        return res.status(200).json({ message: "Successfully deleted the income" });
    }
    catch (error) {
        next(error);
    }
}));
app.delete("/api/deleteUser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        const { userId } = req.body;
        if (!(token in tokenDictionary)) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        const user = tokenDictionary[token];
        if (user.getUserId() != userId) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        yield dbAPI.deleteUserRecord(userId);
        delete tokenDictionary[token];
        return res.status(200).json({ message: "Successfully deleted the user" });
    }
    catch (error) {
        next(error);
    }
}));
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.message == "invalid Email") {
        return res.status(400).json({ error: "Bad Request" });
    }
    res.status(500).json({ error: err.message });
};
// Server setup
app.use(errorHandler);
exports.default = app;
