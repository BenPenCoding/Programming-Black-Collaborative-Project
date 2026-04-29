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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // create user
    const signUpResponse = yield (0, supertest_1.default)(app_1.default)
        .post("/api/signUp")
        .send({
        firstName: "Test",
        lastName: "User",
        username: "jestUser",
        email: "jestUser@durham.ac.uk",
        password: "DBPass123"
    });
    authToken = signUpResponse.body.token;
}));
describe("Testing non-route functions", () => {
    test.skip("Testing hashing function", () => {
        // tested with a working version of scryptSync
        expect((0, app_2.verifyPassword)("DBPass", "5ccfba60ab44525a75408d255d64823a", "bb362cb25e1695cc1cc14f59e9d69e0cc57aea14184d8938307a6c07c2e187fbfc583825fc5d915be81b7b65952fefc0061a79ec5961da0374167023b3e0f4b5")).toBe(true);
    });
});
describe("Testing the login service", () => {
    test.skip('POST api/login succeeds with correct username and password', () => {
        return (0, supertest_1.default)(app_1.default)
            .post("/api/login")
            .send({
            username: "jestUser",
            password: "DBPass123"
        })
            .expect(200);
    });
    test.skip('POST api/login rejects empty username and password ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/login")
            .send({
            username: "",
            password: ""
        })
            .expect(400);
    });
    test.skip('POST api/login rejects non-string entry for username and password ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/login")
            .send({
            username: 4,
            password: 6
        })
            .expect(500);
    });
    test.skip('POST api/login rejects correct username and wrong password (testing hashing function has been integrated correctly) ', () => {
        return (0, supertest_1.default)(app_1.default).post("/api/login")
            .send({
            username: "ejs",
            password: "WrongPass"
        })
            .expect(500);
    });
});
describe("Testing the sign up service", () => {
    test.skip('POST api/login rejects empty fields ', () => {
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
    test.skip('POST api/login rejects non-string entry for username and password ', () => {
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
//////////////////////////////////////////////////////////////////////////////////
describe("Testing the get Users Expense service", () => {
    // Had to hard code an auth token as cached system does not work with server not being run
    test.skip('POST api/getUsersExpenses succeeds with correct token and returns expenses', () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/getUsersExpenses")
            .set("token", authToken)
            .expect(200);
    });
});
describe("Testing the get Users income service", () => {
    // Had to hard code an auth token as cached system does not work with server not being run
    test.skip('POST api/getUsersIncomes succeeds with correct token and returns expenses', () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/getUsersExpenses")
            .set("token", authToken)
            .expect(200);
    });
});
