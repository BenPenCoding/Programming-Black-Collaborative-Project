"use strict";
// 3 classes users,income,expenses
Object.defineProperty(exports, "__esModule", { value: true });
exports.Income = exports.Expense = exports.User = void 0;
class User {
    constructor(firstName, lastName, username, email, password, salt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.hashedPassword = password;
        this.id = 0;
        this.salt = salt;
        if (this.validateEmail(email)) {
            this.email = email;
        }
        else {
            throw new Error("invalid Email");
        }
    }
    getFirstName() {
        return this.firstName;
    }
    setFirstName(input) {
        this.firstName = input;
    }
    getUserName() {
        return this.username;
    }
    setUserName(input) {
        this.username = input;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(input) {
        this.lastName = input;
    }
    getEmail() {
        return this.email;
    }
    setEmail(input) {
        if (this.validateEmail(input)) {
            this.email = input;
        }
    }
    getHashedPassword() {
        return this.hashedPassword;
    }
    setHashedPassword(input) {
        this.hashedPassword = input;
    }
    getUserId() {
        return this.id;
    }
    setUserId(newUserId) {
        this.id = newUserId;
    }
    validateEmail(inputEmail) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(inputEmail)) {
            return true;
        }
        return false;
    }
    getSalt() {
        return this.salt;
    }
    setSalt(newSalt) {
        this.salt = newSalt;
    }
}
exports.User = User;
class cashFlow {
    constructor(name, cashFlowInstance, dateAdded, description, userId, recurring, recurringFreq) {
        this.name = name;
        this.cashFlowInstance = cashFlowInstance;
        this.dateAdded = dateAdded;
        this.description = description;
        this.userId = userId;
        this.id = 0;
        this.recurring = recurring;
        if (recurringFreq) {
            this.recurringFreq = recurringFreq;
        }
        else {
            this.recurringFreq = -1;
        }
    }
}
class Expense extends cashFlow {
    constructor({ name, cost, dateAdded, description, userId, recurring, recurringFreq }) {
        super(name, cost, dateAdded, description, userId, recurring, recurringFreq);
    }
    getExpensesName() {
        return this.name;
    }
    setExpensesName(input) {
        this.name = input;
    }
    getCost() {
        return this.cashFlowInstance;
    }
    setCost(input) {
        this.cashFlowInstance = input;
    }
    getDateAdded() {
        return this.dateAdded;
    }
    setDateAdded(input) {
        this.dateAdded = input;
    }
    getDescription() {
        return this.description;
    }
    setDescription(input) {
        this.description = input;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(newUserId) {
        this.userId = newUserId;
    }
    getExpenseId() {
        return this.id;
    }
    setExpenseId(newExpenseId) {
        this.id = newExpenseId;
    }
    getRecurring() {
        return this.recurring;
    }
    setRecurring(newRecurring) {
        this.recurring = newRecurring;
    }
    getRecurringFreq() {
        return this.recurringFreq;
    }
    setRecurringFreq(newRecurringFreq) {
        this.recurringFreq = newRecurringFreq;
    }
}
exports.Expense = Expense;
class Income extends cashFlow {
    constructor({ name, earning, userId, dateAdded, description, recurring, recurringFreq }) {
        super(name, earning, dateAdded, description, userId, recurring, recurringFreq);
    }
    getIncomeName() {
        return this.name;
    }
    setIncomeName(newName) {
        this.name = newName;
    }
    getIncomeId() {
        return this.id;
    }
    setIncomeId(newIncomeId) {
        this.id = newIncomeId;
    }
    getEarning() {
        return this.cashFlowInstance;
    }
    setEarning(newEarning) {
        this.cashFlowInstance = newEarning;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(newUserId) {
        this.userId = newUserId;
    }
    getDateAdded() {
        return this.dateAdded;
    }
    setDateAdded(newDate) {
        this.dateAdded = newDate;
    }
    getDescription() {
        return this.description;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    getRecurring() {
        return this.recurring;
    }
    setRecurring(newRecurring) {
        this.recurring = newRecurring;
    }
    getRecurringFreq() {
        return this.recurringFreq;
    }
    setRecurringFreq(newRecurringFreq) {
        this.recurringFreq = newRecurringFreq;
    }
}
exports.Income = Income;
