import app from "./app";
import request from "supertest";


describe("Testing the login service",() =>{
    test('POST api/login succeeds',() => {
        return request(app)
        .post("/api/login")
        .send({
            username: "ejs",
            password: "DBPass"
        })
        .expect(200)
    })
})