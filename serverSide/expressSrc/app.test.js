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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_2 = require("./app");
const supertest_1 = __importDefault(require("supertest"));
let authToken;
let testUserId;
/*
beforeAll(async () => {
    // create user
    const signUpResponse = await request(app)
        .post("/api/signUp")
        .send({
            firstName: "Test",
            lastName: "User",
            username: "jestUser",
            email: "jestUser@durham.ac.uk",
            password: "DBPass123"
        });

    
    authToken = signUpResponse.body.token;
});
*/
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // create user
    const loginResponse = yield (0, supertest_1.default)(app_1.default)
        .post("/api/login")
        .send({
        username: "jestUser",
        password: "DBPass123"
    });
    authToken = loginResponse.body.token;
    testUserId = loginResponse.body.userId;
}));
describe("Testing non-route functions", () => {
    test.skip("Testing hashing function", () => {
        // tested with a working version of scryptSync
        expect((0, app_2.verifyPassword)("DBPass", "5ccfba60ab44525a75408d255d64823a", "bb362cb25e1695cc1cc14f59e9d69e0cc57aea14184d8938307a6c07c2e187fbfc583825fc5d915be81b7b65952fefc0061a79ec5961da0374167023b3e0f4b5")).toBe(true);
    });
});
describe("Testing the login service", () => {
    test.skip('POST /api/login succeeds with correct username and password', () => {
        return (0, supertest_1.default)(app_1.default)
            .post("/api/login")
            .send({
            username: "jestUser",
            password: "DBPass123"
        })
            .expect(200);
    });
    test.skip('POST /api/login rejects empty username and password ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/login")
            .send({
            username: "",
            password: ""
        })
            .expect(400);
    });
    test.skip('POST /api/login rejects non-string entry for username and password ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/login")
            .send({
            username: 4,
            password: 6
        })
            .expect(500);
    });
    test.skip('POST /api/login rejects correct username and wrong password (testing hashing function has been integrated correctly) ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/login")
            .send({
            username: "ejs",
            password: "WrongPass"
        })
            .expect(500);
    });
});
describe("Testing the sign up service", () => {
    test.skip('POST /api/login rejects empty fields ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/signUp")
            .send({
            firstName: "",
            lastName: "Account 2 Lastname",
            username: "",
            email: "account2@durham.ac.uk",
            password: "DBPassAccount2",
        })
            .expect(400);
    });
    test.skip('POST /api/login rejects non-string entry for username and password ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/signUp")
            .send({
            firstName: 5,
            lastName: 6,
            username: "ejsAccount2",
            email: "account2@durham.ac.uk",
            password: "DBPassAccount2",
        })
            .expect(500);
    });
});
describe("testing the add expenses and add income services", () => {
    test.skip('POST /api/addExpense works  ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/addExpense")
            .set({ token: authToken })
            .send({
            name: "jest expense",
            cost: "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId: testUserId,
            description: "jest expense description",
            recurring: false,
            recurringFreq: -1
        })
            .expect(200);
    });
    test.skip('POST /api/addIncome works  ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/addIncome")
            .set({ token: authToken })
            .send({
            name: "jest income",
            earning: "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId: testUserId,
            description: "jest income description",
            recurring: false,
            recurringFreq: -1
        })
            .expect(200);
    });
});
//////////////////////////////////////////////////////////////////////////////////
/*

*/
describe("testing get users methods", () => {
    test.skip("get users expense", () => {
        return (0, supertest_1.default)(app_1.default).get("/api/getUsersExpenses")
            .set({ token: authToken })
            .expect(200);
    });
    test.skip("get users expense", () => {
        return (0, supertest_1.default)(app_1.default).get("/api/getUsersIncomes")
            .set({ token: authToken })
            .expect(200);
    });
});
///////////////////////////////////////////////////////////////////////////////////
describe("Testing the update services", () => {
    test.skip('POST /api/updateExpense ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/updateExpense")
            .set({ token: authToken })
            .send({
            name: "jest expense",
            cost: "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId: testUserId,
            description: "jest expense description updated",
            id: 3,
            recurring: false,
            recurringFreq: -1
        })
            .expect(200);
    });
    test.skip('POST /api/updateIncome ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/updateIncome")
            .set({ token: authToken })
            .send({
            name: "jest income",
            earning: "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId: testUserId,
            description: "jest income description updated",
            id: 3,
            recurring: false,
            recurringFreq: -1
        })
            .expect(200);
    });
});
/////////////////////////////////////////////////////////////////////////////////
/*

|Field | Data Type |
|------| ----------|
|userId | number |
| expenseId | number |

*/
describe("Testing the deleter services", () => {
    test.skip("Delete /api/deleteExpense", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/deleteExpense")
            .set({ token: authToken })
            .send({
            userId: testUserId,
            expenseId: 3
        });
    });
    test.skip("Delete /api/deleteIncomes", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/deleteIncome")
            .set({ token: authToken })
            .send({
            userId: testUserId,
            expenseId: 3
        });
    });
    test.skip("Delete /api/deleteUser", () => {
        return (0, supertest_1.default)(app_1.default).delete("/api/deleteUser")
            .set({ token: authToken })
            .send({
            userId: testUserId,
        });
    });
});
