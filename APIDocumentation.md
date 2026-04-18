# API Documentation

This document describes the Representation State Transfer Application Programming Interface which governs the interactions between the server and the webpage.

## Status Codes
200 -> Successful Response
400 -> Bad Request
500 -> Internal Server Error

## Post Requests

### Log in 
Endpoint = "api/login"

Successful Response = 
{
    "token" : "5489548953873409"
}
Unsuccessful Response = 
{
    "error" : "Internal Server Error"
}

