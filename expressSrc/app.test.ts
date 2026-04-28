import { response } from "express";
import app from "./app";
import {verifyPassword} from "./app";
import request from "supertest";

/**
 * These tests take a long time to execute so I have add .skip(),remove this to test them properly
 * Also all the data i am using was created specifically for testing, and was deleted after I finished testing
 */
describe("Testing non-route functions",() =>{
    test.skip("Testing hashing function",() =>{
        // tested with a working version of scryptSync
        expect(verifyPassword("DBPass","5ccfba60ab44525a75408d255d64823a","bb362cb25e1695cc1cc14f59e9d69e0cc57aea14184d8938307a6c07c2e187fbfc583825fc5d915be81b7b65952fefc0061a79ec5961da0374167023b3e0f4b5")).toBe(true)

    })

})
describe("Testing the login service",() =>{
    test.skip('POST api/login succeeds with correct username and password',() => {
        return request(app)
        .post("/api/login")
        .send({
            username: "ejs",
            password: "DBPass"
        })
        .expect(200)
    })
    test.skip('POST api/login rejects empty username and password ',() =>{
        return request(app).post("/api/login")
        .send({
            username : "",
            password : ""

        })
        .expect(400)
    })
    test.skip('POST api/login rejects non-string entry for username and password ',() =>{
        return request(app).post("/api/login")
        .send({
            username : 4,
            password : 6

        })
        .expect(500)
    })
    test.skip('POST api/login rejects correct username and wrong password (testing hashing function has been integrated correctly) ',() =>{
        return request(app).post("/api/login")
        .send({
            username : "ejs",
            password : "WrongPass"

        })
        .expect(500)
    })

})
describe("Testing the sign up service",() =>{
    test.skip('POST api/signUp succeeds with correct username, password, email, first name, last name',() => {
        return request(app)
        .post("/api/signUp")
        .send({
            firstName : "Account 2 Firstname",
            lastName : "Account 2 Lastname",
            username: "ejsAccount2",
            email : "account2@durham.ac.uk",
            password: "DBPassAccount2",

            
        })
        .expect(200)
    })
    test.skip('POST api/login rejects empty fields ',() =>{
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
    
 
    test.skip('POST api/login rejects non-string entry for username and password ',() =>{
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

describe("Testing the get Users Expense service",() =>{

    // Had to hard code an auth token as cached system does not work with server not being run
    const authToken = "authTokenForTesting"
    test.skip('POST api/getUsersExpenses succeeds with correct token and returns expenses', () => {
        return request(app)
        .get("/api/getUsersExpenses")
        .set("token", authToken)
        .expect(200)
        
    });
    
})