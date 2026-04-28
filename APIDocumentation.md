Remeber to update anchor Tages
unsuccessfull response added 

# API Documentation

This document describes the Representation State Transfer Application Programming Interface which governs the interactions between the server and the webpage.

[Status Codes and Error Messages](#status-codes-and-error-messages)
[Authentication](#authentication)
[Post Requests](#post-requests)
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

When a user successfully logs in or signs up, an authetication token is generated. For all subsequent requests this token must be attached in the header part of the requests. 

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
[Update Expense](#update-user-expense)


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
##### Example Unsuccessfull Reponse for other Routes
```
{
    error : "Internal Server Error"
}
```

### Log in 
Description - checks to see if the username and password are in the remote database, and if an account is found then an authentication token is generated. Otherwise an error message is sent, detailing the issue with the request or server.

Endpoint = "/api/login"

HTTP Method - POST /api/login

##### Request Body Parameters

All parameters are mandatory 

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



### Sign up

Description - Attempts to successfully add a user to the database. If successfull, then an authentication token is generated. If unsuccessfull an error message will be sent detailing the issue with the request.

Endpoint = "/api/signUp"

HTTP Method - POST /api/signUp

##### Request Body Paramters



| Field | Data Type |
|-------|-----------|
| firstName | string |
| lastName | string |
| userName | string |
| email     | string |
| password | string |

#### Validation Rules
 
All fields are mandatory
Email must be formatted correctly
Email must be unqiue to each user



[Examples of a Successfull and Unsuccssful Reponses](#example-successful-response)

### Update User Expense

Description - Allows a user to modify a pre-existing expense

Endpoint = /api/updateExpense

HTTP Method - POST /api/updateExpense


##### Request Body parameters

set parameters to empty if unchanged, but all parameters are still required


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


###### Successfull Response 
```
{
    response : "successfully updated expense"
}
```
### Update User's Income

Description - Allows a user to modify a pre-existing Income

Endpoint = /api/updateIncome

HTTP Method - POST /api/updateIncome


##### Request Body parameters


set parameters to empty or null if unchanged, but all parameters are required


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


###### Successfull Response 
```
{
    response : "successfully updated income"
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


###### Successfull Reponse 
```
{
    "resonse" : "succssfully added expense"
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


###### Successfull Reponse 
```
{
    "resonse" : "succssfully added expense"
}
```



## GET,Delete Routes

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
        expense: 'account expense name',
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
        incomeName: 'account income name',
        earning: '100',
        userId: 9,

        dateAdded: '2026-04-26T17:05:10.000Z',
        description: 'Dummy income',
        incomeId: 2,
        recurring: false,
        recurringFreq: -1
      }
    ]
}
```

[Unsuccessfull Response](#unsuccessfull-request-for-getdelete-requests)


## Delete Routes 

### Delete Expense

Description - Deletes a users expense permanately, requires usersId as well for an additional layer of security

Endpoint = "/api/deleteExpense"

HTTP Method - DELETE api/deleteExpense

###### Request Body Parameters

|Field | Data Type |
|------| ----------|
|userId | number |
| expenseId | number |

Example Successfull Response 
```
{
    "response " : "Successfully deleted the expense"

}
```


### Delete Income

Description - Deletes a users income permanately, requires usersId as well for an additional layer of security

Endpoint = "/api/deleteIncome"

HTTP Method - DELETE api/deleteIncome

###### Request Body Parameters

|Field | Data Type |
|------| ----------|
|userId | number |
| incomeId | number |

Example Successfull Response 
```
{
    "response " : "Successfully deleted the income"

}
```

### Delete Expense

Description - Deletes a user  permanately, 

Endpoint = "/api/deleteUser"

HTTP Method - DELETE api/deleteUser

###### Request Body Parameters

|Field | Data Type |
|------| ----------|
|userId | number |


Example Successfull Response 
```
{
    "response " : "Successfully deleted the user"

}
```
