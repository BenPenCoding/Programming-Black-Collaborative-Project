import { response } from "express";
import app, { hashPassword } from "./app";
import {verifyPassword} from "./app";
import request from "supertest";



let authToken : string;
let testUserId: number;
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
beforeAll(async () => {
    // create user
    const loginResponse = await request(app)
        .post("/api/login")
        .send({
            username : "jestUser",
            password : "DBPass123"
        });

    
    authToken = loginResponse.body.token;
    testUserId = loginResponse.body.userId
});


describe("Testing non-route functions",() =>{
    test.skip("Testing hashing function",() =>{
        // tested with a working version of scryptSync
        expect(verifyPassword("DBPass","5ccfba60ab44525a75408d255d64823a","bb362cb25e1695cc1cc14f59e9d69e0cc57aea14184d8938307a6c07c2e187fbfc583825fc5d915be81b7b65952fefc0061a79ec5961da0374167023b3e0f4b5")).toBe(true)

    })

})
describe("Testing the login service",() =>{
    test.skip('POST /api/login succeeds with correct username and password',() => {
        return request(app)
        .post("/api/login")
        .send({
            username: "jestUser",
            password: "DBPass123"
        })
        .expect(200)
    })
    test.skip('POST /api/login rejects empty username and password ',() =>{
        return request(app).post("/api/login")
        .send({
            username : "",
            password : ""

        })
        .expect(400)
    })
    test.skip('POST /api/login rejects non-string entry for username and password ',() =>{
        return request(app).post("/api/login")
        .send({
            username : 4,
            password : 6

        })
        .expect(500)
    })
    test.skip('POST /api/login rejects correct username and wrong password (testing hashing function has been integrated correctly) ',() =>{
        return request(app).post("/api/login")
        .send({
            username : "ejs",
            password : "WrongPass"

        })
        .expect(500)
    })

})
describe("Testing the sign up service",() =>{

    test.skip('POST /api/login rejects empty fields ',() =>{
        return request(app).post("/api/signUp")
        .send({
            firstName : "",
            lastName : "Account 2 Lastname",
            username: "",
            email : "account2@durham.ac.uk",
            password: "DBPassAccount2",

            
        })
        .expect(400)
    });
    
 
    test.skip('POST /api/login rejects non-string entry for username and password ',() =>{
        return request(app).post("/api/signUp")
        .send({
            firstName : 5,
            lastName : 6,
            username: "ejsAccount2",
            email : "account2@durham.ac.uk",
            password: "DBPassAccount2",

            
        })
        .expect(500)
    })


})

describe("testing the add expenses and add income services",() =>{
    test.skip('POST /api/addExpense works  ',() =>{
        return request(app).post("/api/addExpense")
        .set({token : authToken})
        .send({
            name : "jest expense",
            cost : "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId : testUserId,
            description : "jest expense description",
            recurring: false,
            recurringFreq : -1

            
        })
        .expect(200)
    });

    test.skip('POST /api/addIncome works  ',() =>{
        return request(app).post("/api/addIncome")
        .set({token : authToken})
        .send({
            name : "jest income",
            earning : "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId : testUserId,
            description : "jest income description",
            recurring: false,
            recurringFreq : -1

            
        })
        .expect(200)
    });
})



//////////////////////////////////////////////////////////////////////////////////

/*

*/

describe("testing get users methods",() => {
    test.skip("get users expense",() => {
         return request(app).get("/api/getUsersExpenses")
        .set({token : authToken})
        .expect(200)
    })
     test.skip("get users expense",() => {
         return request(app).get("/api/getUsersIncomes")
        .set({token : authToken})
        .expect(200)
    })

});








///////////////////////////////////////////////////////////////////////////////////
describe("Testing the update services",() => {
    test.skip('POST /api/updateExpense ',() =>{
        return request(app).post("/api/updateExpense")
        .set({token : authToken})
        .send({
            name : "jest expense",
            cost : "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId : testUserId,
            description : "jest expense description updated",
            id : 3,
            recurring: false,
            recurringFreq : -1

            
        })
        .expect(200)
    });

     test.skip('POST /api/updateIncome ',() =>{
        return request(app).post("/api/updateIncome")
        .set({token : authToken})
        .send({
            name : "jest income",
            earning : "10000",
            dateAdded: new Date(2026, 3, 30, 15, 45, 30),
            userId : testUserId,
            description : "jest income description updated",
            id : 3,
            recurring: false,
            recurringFreq : -1

            
        })
        .expect(200)
    });
})



/////////////////////////////////////////////////////////////////////////////////
/*

|Field | Data Type |
|------| ----------|
|userId | number |
| expenseId | number |

*/

describe("Testing the deleter services",() =>  {
    test.skip("Delete /api/deleteExpense", () => {
        return request(app).delete("/api/deleteExpense")
        .set({token : authToken})
        .send({
            userId:testUserId,
            expenseId : 3
        })
    })
     test.skip("Delete /api/deleteIncomes", () => {
        return request(app).delete("/api/deleteIncome")
        .set({token : authToken})
        .send({
            userId:testUserId,
            expenseId : 3
        })
    })
    test.skip("Delete /api/deleteUser", () => {
        return request(app).delete("/api/deleteUser")
        .set({token : authToken})
        .send({
            userId:testUserId,
            
        })
    })
})