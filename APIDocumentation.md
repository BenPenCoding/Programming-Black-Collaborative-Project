Remeber to update anchor Tages

# API Documentation

This document describes the Representation State Transfer Application Programming Interface which governs the interactions between the server and the webpage.

[Status Codes and Error Messages](#status-codes-and-error-messages)
[Authentication](#authentication)
[Post Requests](#post-request)
[Get Requests](#get-requests)

## Status Codes and Error Messages

### Status Codes

| Status code | Description           |
|-------------|-----------------------|
| 200         | Successfull Response  |
| 400         | Bad Request           |
| 500         | Internal Server Error |

### Error Messages

| Status Code | Error Message | Reasons For Error Message |
|-------------|---------------|---------------------------|
| 400| Bad Request | Missing field in body, invalid email format |
|401 | Unauthorised Access | Incorrect username or password, Missing or Incorrect Authentication Token |
| 500  | Internal Server Error | Database Failure | 


## Authentication

When a user successfully logs in or signs up, an authetication token is generated. For subsequent requests this token must be attached in the header part of the requests. 

##### Example Header 
```
{
    "Content-Type" : "application/json",
    "token" : "9c44f7a6a7079bb85bf46a4496ae7b4ad095f7c3fce312cad82c57c4bd574769e4829872961c6ece74e34729bdacfb0752ef229bc3e23327dbcc76d643b1242b"
}

```
## Post Requests

[Log in ](#log-in)
[Sign up](#sign-up)

### Log in 
Description - checks to see if the username and password are in the remote database, and if an account is found then an authentication token is generated. Otherwise an error message is sent, detailing the issue with the request or server.

Endpoint = api/login

HTTP Method - POST api/login

##### Request Body Parameters
|Field| Data Type |
|-----|------------|
| username | string |
| password | string |


##### Example Request Body


```
{
    username : "apiUsername",
    password : "apiPassword"
}
```

#### Validation Rules
both username and password cannot be empty otherwise a status 400 code will be sent as a response.


##### Example Successfull and Unsuccesfull Responses for Sign up and Log in 
```
{
    "token" : "9c44f7a6a7079bb85bf46a4496ae7b4ad095f7c3fce312cad82c57c4bd574769e4829872961c6ece74e34729bdacfb0752ef229bc3e23327dbcc76d643b1242b"
}

Example Unsuccessfull Response = 
{
    "error" : "Internal Server Error"
}
```

### Sign up

Description - Attempts to successfully add a user to the database. If successfull, then an authentication token is generated. If unsuccessfull an error message will be sent detailing the issue with the request.

Endpoint = api/signUp

HTTP Method - POST api/signUp


| Field | Data Type |
|-------|-----------|
| firstName | string |
| lastName | string |
| userName | string |
| email     | string |
| password | string |

#### Validation Rules
 
All fields must not be empty
Email must be formatted correctly
Email must be unqiue to each user



[Examples of a Successfull and Unsuccssful Reponses](#example-successful-response)


## GET requests

Each Get request requires a correct authentication token in the header.
[Correct Header Example](#example-header)

###### Unsuccessfull Request for Get,Delete Requests 
```
{
    error : "Internal Server Error "
}
```
### Get User's Expeneses

Returns an array of users expenses. 

Endpoint= "/api/getUsersExpenses"

HTTP Method - GET /api/getUsers/Expenses


##### Response Body Array of Expenses

|Field | Data Type |
|------|-----------|
|name | string |
|cost | string |
|dateAdded| Date|
|description| string |
|userId | number |
|recurring | boolean |
| recurringFreq | number |


##### Example successfull Response
```
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

```



[Unsuccessfull Response](#example-successfull-and-unsuccesfull-responses-for-get-Requests)

### Get User's Incomes

Returns an array of users incomes.

Endpoint= "/api/getUsersIncomes"

HTTP Method = GET /api/getUsersIncomes
##### Response Body Array of Incomes


| Field | Data Type |
|-------|-----------|
|name | string |
|earning | string |
| userId | number |
| dateAdded | Date |
|description | string|
|recurring | boolean |
| recurringFreq| number |



```
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
```

[Unsuccessfull Response](#unsuccessfull-request-for-getdelete-requests)

