# API Documentation

This document describes the Representation State Transfer Application Programming Interface which governs the interactions between the server and the webpage.



## Status Codes
200 -> Successfull Response
400 -> Bad Request
500 -> Internal Server Error

## Post Requests

### Log in 
Description - checks to see if the username and password are in the remote database, and if an account is found then an authentication token is generated otherwise an error message is sent, and a status code is attached.

Endpoint = api/login

HTTP Method - POST api/login

Request Body Parameters = {
    username : String,
    password : String
}

#### Validation Rules
both username and password cannot be empty otherwise a status 400 code will be sent as a response.


Example Successful Response = 
{
    "token" : "9c44f7a6a7079bb85bf46a4496ae7b4ad095f7c3fce312cad82c57c4bd574769e4829872961c6ece74e34729bdacfb0752ef229bc3e23327dbcc76d643b1242b"
}

Example Unsuccessful Response = 
{
    "error" : "Internal Server Error"
}

### Sign up

Description - Attempts to successfully add a user to the database. If successfull, then an authentication token is generated. If unsuccessfull an error message will be sent detailing the issue with the request.

Endpoint = api/signUp

HTTP Method - POST api/signUp

Request Body Parameters =
 {
    username : String,
    firstName: String,
    lastName : String,
    email : String,
    password: String
}

#### Validation Rules
 
All fields must not be empty
Email is validated with basic regex
Email must be unqiue to each user

If any of these rules are broken then there# a stauts code of 400 will be sent as a except email must be unique to each user which has a status code of 500.


Example Successfull Response =
 {
    "token" : "9c44f7a6a7079bb85bf46a4496ae7b4ad095f7c3fce312cad82c57c4bd574769e4829872961c6ece74e34729bdacfb0752ef229bc3e23327dbcc76d643b1242b"
}

Example Unsuccessful Response = 
{
    "error" : "Invalid Email"
}



## GET requests

### Get User's Expeneses

Returns an array of users expenses. Requires an auth token in the header

Endpoint= "/api/getUsersExpenses"

Request Header Parameters = {
    token : string 
}

Example successfull Response
{
      [
      {
        incomeName: 'account expense name',
        cost: '100',
        dateAdded: '2026-04-26T17:05:10.000Z',
        description: 'Dummy account',
        userId: 9,
        expenseId: 2,
        recurring: false,
        recurringFreq: -1
      }
    ]
}
Example Unsuccessfull Reponse = 
{
    "error" : "Internal Server error"

}

### Get User's Incomes

Returns an array of users incomes. Requires an auth token in the header

Endpoint= "/api/getUsersIncomes"

Request Header Parameters = {
    token : string 
}

Example successfull Response
{
      [
      {
        expensesName: 'account expense name',
        earning: '100',
        dateAdded: '2026-04-26T17:05:10.000Z',
        description: 'Dummy income',
        userId: 9,
        incomeId: 2,
        recurring: false,
        recurringFreq: -1
      }
    ]
}
Example Unsuccessfull Reponse = 
{
    "error" : "Internal Server error"

}

private incomeName: string;
    private incomeId: number;
    private earning: number;
    private userId: number;
    private dateAdded: Date;