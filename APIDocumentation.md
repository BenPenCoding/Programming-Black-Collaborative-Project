# API Documentation

This document describes the Representation State Transfer Application Programming Interface which governs the interactions between the server and the webpage.

## Status Codes
200 -> Successfull Response
400 -> Bad Request
500 -> Internal Server Error

## Post Requests

### Log in 
Description - checks to see if the username and password are in the remote database, and if an account is found then an authentication token is generated otherwise an error message is sent, with the correct status code attached to both response.
Endpoint = api/login

Request Body Parameters = {
    username : String,
    password : String
}

Example Successful Response = 
{
    "token" : "5489548953873409"
}

Example Unsuccessful Response = 
{
    "error" : "Internal Server Error"
}

## Sign up

Description - Attempts to successfully add a user to the database. If successfull, then an authentication token is generated. If unsuccessfull an error message will be sent detailing the issue with the request.
Endpoint = api/signUp

Request Body Parameters = {
    username : String,
    firstName: String,
    lastName : String,
    email : String,
    password: String
}

Example Successfull Response = {
    "token" : "5489548953873409"
}
Example Unsuccessful Response = {
    "error" : "Invalid Email"
}
