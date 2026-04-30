

# API Documentation

This document describes the REST API which governs the interactions between the server and the webpage.
 
- [Status Codes and Error Messages](#status-codes-and-error-messages)
- [Authentication](#authentication)
- [Post Requests](#post-requests)
- [Get Requests](#get-requests)
- [Delete Requests](#delete-routes)
## Status Codes and Error Messages

### Status Codes

| Status code | Description           |
|-------------|-----------------------|
| 200         | successful Response  |
| 400         | Bad Request           |
| 500         | Internal Server Error |

### Error Messages

| Specific Status Code | Error Message | Reasons For Error Message |
|-------------|---------------|---------------------------|
| 400| Bad Request | Missing field in body, invalid email format |
|401 | Unauthorised Access | Incorrect username or password, Missing or Incorrect Authentication Token |
| 403 | Forbidden | Accessing another user's resources |
| 500  | Internal Server Error | Database Failure | 


## Authentication

When a user successfully logs in or signs up, an authentication token is generated. For all subsequent requests to the server this token must be attached in the header part of the requests. 

Authentication is not required for:
- POST /api/login
- POST /api/signUp

##### Example Header 
```
{
    "Content-Type" : "application/json",
    "token" : "9c44f7a6a7079bb85bf46a4496ae7b4ad095f7c3fce312cad82c57c4bd574769e4829872961c6ece74e34729bdacfb0752ef229bc3e23327dbcc76d643b1242b"
}

```
## Post Requests

- [Log in ](#log-in)
- [Sign up](#sign-up)
- [Update Expense](#update-user-expense)
- [Update Income](#update-users-income)
- [Add Expense ](#add-expense)
- [Add Income ](#add-income)


### Log in 
Description - checks to see if the username and password are in the remote database, and if an account is found then an authentication token is generated and userId is sent. Otherwise an error message is sent, detailing the issue with the request or server.

Endpoint = "/api/login"

HTTP Method - POST /api/login

##### Request Body Parameters

All parameters are mandatory 

|Field| Data Type |
|-----|------------|
| username | string |
| password | string |



#### Validation Rules

both username and password cannot be empty otherwise a status 400 code will be sent as a response.

[successful and Unsuccessful responses](#successful-and-unsuccessful-responses)


### Sign up

Description - Attempts to successfully add a user to the database. If successful, then an authentication token is generated and user id. If unsuccessful an error message will be sent detailing the issue with the request.

Endpoint = "/api/signUp"

HTTP Method - POST /api/signUp

##### Request Body Parameters



| Field | Data Type |
|-------|-----------|
| firstName | string |
| lastName | string |
| username | string |
| email     | string |
| password | string |

#### Validation Rules
 
All fields are mandatory
Email must be formatted correctly
Email must be unique to each user

[successful and Unsuccessful responses](#successful-and-unsuccessful-responses)



### Update User Expense

Description - Allows a user to modify a pre-existing expense

Endpoint = "/api/updateExpense"

HTTP Method - POST /api/updateExpense


##### Request Body parameters

Fields may be set to null if unchanged.


|Field | Data Type |
|------|-----------|
|expensesName | string |
|cost | string |
|dateAdded| Date|
|description| string |
|userId | number |
|id| number |
|recurring | boolean |
| recurringFreq | number |


[successful and Unsuccessful responses](#successful-and-unsuccessful-responses)

### Update User's Income

Description - Allows a user to modify a pre-existing Income

Endpoint = "/api/updateIncome"

HTTP Method - POST /api/updateIncome


##### Request Body parameters

Fields may be set to null if unchanged.


|Field | Data Type |
|------|-----------|
|incomeName | string |
|earning | string |
|userId | number |
|id | number |
|dateAdded| Date|
|description| string |
|recurring | boolean |
| recurringFreq | number |


###### successful Response 
```
{
    "response" : "successfully updated income"
}
```


### Add Expense 

Description = Allows a user to add an expense

Endpoint = "/api/addExpense"

HTTP Method - POST /api/addExpense

##### Request Body Parameters
{name, cost , dateAdded , description , userId,recurring,recurringFreq}

|Field | Data Type |
|------|-----------|
|name | string|
|cost | number |
|dateAdded | Date |
|description | string |
|userId | number |
|recurring | boolean |
|recurringFreq| number |


###### successful response 
```
{
    "response" : "successfully  added expense"
}
```
### Add Income 

Description = Allows a user to add an income

Endpoint = "/api/addIncome"

HTTP Method - POST /api/addIncome

##### Request Body Parameters


|Field | Data Type |
|------|-----------|
|name | string|
|earning | number |
|userId | number |
|dateAdded | Date |
|description | string |
|recurring | boolean |
|recurringFreq| number |


###### successful response 
```
{
    "response" : "successfully added incomef"
}
```



## GET,Delete Routes

Each Get request requires a correct authentication token in the header.

- [Correct Header Example](#example-header)
- [Get Users Expenses](#get-users-expenses)
- [Get Users Incomes](#get-users-incomes)
- [Delete a Users Expense](#delete-expense)
- [Delete a Users Income ](#delete-income)
-[Delete User](#delete-user)

###### Unsuccessful Request for Get and Delete Requests 
```
{
    "error" : "Internal Server Error "
}
```
### Get User's Expenses

Returns an array of users expenses. 

Endpoint= "/api/getUsersExpenses"

HTTP Method - GET /api/getUsersExpenses


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


##### Example successful Response
```

[
    {
        "expense": "account expense name",
        "cost": '100',
        "dateAdded": '2026-04-26T17:05:10.000Z',
        "description": "Dummy account",
        "userId": 9,
        "expenseId": 2,
        "recurring": false,
        "recurringFreq": -1
    }
]


```



[Unsuccessful Response](#example-unsuccessful-response-for-other-routes)

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
Example successful Response

[
    {
        "incomeName": "account income name",
        "earning": '100',
        "userId": 9,
        "dateAdded": "2026-04-26T17:05:10.000Z",
        "description": "Dummy income",
        "incomeId": 2,
        "recurring": false,
        "recurringFreq": -1
    }
]

```

[Unsuccessful Response](#unsuccessful-request-for-getdelete-requests)


## Delete Requests 

### Delete Expense

Description - Deletes a users expense permanently, requires userId as well for an additional layer of security

Endpoint = "/api/deleteExpense"

HTTP Method - DELETE api/deleteExpense

###### Request Body Parameters

|Field | Data Type |
|------| ----------|
|userId | number |
| expenseId | number |

Example successful Response 
```
{
    "response" : "successfully deleted the expense"

}
```


### Delete Income

Description - Deletes a users income permanently, requires userId as well for an additional layer of security

Endpoint = "/api/deleteIncome"

HTTP Method - DELETE api/deleteIncome

###### Request Body Parameters

|Field | Data Type |
|------| ----------|
|userId | number |
| incomeId | number |

Example successful Response 
```
{
    "response" : "successfully deleted the income"

}
```

### Delete User

Description - Deletes a user  permanently, 

Endpoint = "/api/deleteUser"

HTTP Method - DELETE api/deleteUser

###### Request Body Parameters

|Field | Data Type |
|------| ----------|
|userId | number |


Example successful Response 
```
{
    "response" : "successfully deleted the user"

}
```


## successful and Unsuccessful Responses 


##### Example successful and Unsuccesful Responses for Sign up and Log in 
```
{
    "token" : "9c44f7a6a7079bb85bf46a4496ae7b4ad095f7c3fce312cad82c57c4bd574769e4829872961c6ece74e34729bdacfb0752ef229bc3e23327dbcc76d643b1242b",
    "userId" : 2
}

Example Unsuccessful Response = 
{
    "error" : "Internal Server Error"
}
```
##### Example Unsuccessful response for other Routes
```
{
    "error" : "Internal Server Error"
}
```
