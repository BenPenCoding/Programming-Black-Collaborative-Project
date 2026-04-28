// Import the express in typescript file
import express, {Request,Response,NextFunction} from 'express'; //Request, Response,NextFunction used for error handling
import * as crypto from 'crypto';
import * as dbAPI from '../src/dbApiFunctions'; // functions for inserting data into neon db
import {User,Expense} from './ClassDefinitions'; 
import { date } from 'drizzle-orm/mysql-core';
import { isNull } from 'drizzle-orm';
// Initialize the express engine



// might have to wrap parse request in try catches


const app: express.Application = express();




export function hashPassword(password : string) {
  // Generate a random salt (16 bytes)
  const salt = crypto.randomBytes(16).toString('hex');

  
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');

  // Return both salt and hash for storage
  return { salt, hash };
}


export function verifyPassword(password : string, salt : string, hash : string) {
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  return hashedPassword === hash;
}

// Example usage


// middleware`
app.use(express.json())

// cached user token map
/*
Due to the constraints or free tier hosting of the backend and the database i implemented a cache system 
to minimise requests.
*/
const tokenDictionary : {[token:string] : User} = {}

// hard coding auth token for testing
const testingUser = new User("Elliot","Sainsbury","ejs","zfdf79@durham.ac.uk","800ad3e9ca7e4aacec36ebb92734e29d5958a401db5d678ab195aac27adfd89f4a9da0e8e8904be162a21a02a7260d2f912c6fe7206481ac10d0564ad78595b5","be39d374b4da7e7f3a01832f0e015a4f") 
testingUser.setUserId(9)
tokenDictionary["authTokenForTesting"] = testingUser

// Post Functions
app.post('/api/login', async (req , res, next ) => {


    const {username, password}  = req.body //  parsing request body
      // check if username or password is empty
    if(!username || !password){
        // client issue so do not send to general error handler
        return res.status(400).json({error: "there is an empty field"})
        }
    try{
      

        const cachedUser = await dbAPI.getUserRecord(username) ; //  checking to see if in the db, userID updated  via return statement
        if(!verifyPassword(password,cachedUser.getSalt(),cachedUser.getHashedPassword())){
            throw new Error("Password is incorrect")
        }

        // create an auth token

        const token = crypto.randomBytes(16).toString('hex');
        
        tokenDictionary[token] = cachedUser
        return res.status(200).json({token})


    }
    catch(error){
        next(error)

    }
});
app.post('/api/signUp', async (req,res,next) => {
    const {firstName,lastName,username,email,password} = req.body
    if(!firstName || !lastName || !username || !email || !password ){
       
        return res.status(400).json({error : " there is an empty field"})
    }
    try{
        const {salt,hash} = hashPassword(password)

        const newUser = new User(firstName,lastName,username,email,hash,salt)
        await dbAPI.AddUser(newUser) // userID updated  via return statement

        const token = crypto.randomBytes(16).toString('hex');
        
        tokenDictionary[token] = newUser
        return res.status(200).json({token})

        
        
    }
    catch(error){
        next(error)
    }
});
/*
app.post("/api/addExpense" async (req,res,next) => {

})

*/

// GET functions
app.get('/api/getUsersExpenses',async(req,res,next) =>{

    const token  = req.headers.token as string
   
    if(!(token in tokenDictionary)){
        // check to see if it is in the logged in tokenDictionary
        return res.status(400).json({error : "Invalid Token"})
    }
    const User = tokenDictionary[token];
    try{
        const ExpensesArr = await dbAPI.getUsersExpenses(User.getUserId())
        return res.status(200).json(ExpensesArr)

    }
    catch(error){
        next(error)
    }



})
app.get('/api/getUsersIncomes',async(req,res,next) =>{

    const token = req.headers.token as string 

    if(!(token in tokenDictionary)){
        // check to see if it is in the logged in tokenDictionary
        return res.status(400).json({error : "Invalid Token"})
    }
    const User = tokenDictionary[token];
    try{
        const IncomesArr = await dbAPI.getUsersIncomes(User.getUserId())
        return res.status(200).json(IncomesArr)

    }
    catch(error){
        next(error)
    }



})

// change location
app.post('/api/addExpense',async (req,res,next) => {
    const token = req.headers.token as string
    if(!(token in tokenDictionary)){
        // check to see if it is in the logged in tokenDictionary
        return res.status(400).json({error : "Invalid Token"})
    }
    const {expensesName,cost,dateAdded,description,userId,id,recurring,recurringFreq} = req.body
    const Expense = await dbAPI.getExpenseRecord(id)
    if(Expense.getExpensesName() != expensesName && expensesName){
        Expense.setExpenseId(expensesName)
    }
    if(Expense.getCost() != cost && cost){
        Expense.setCost(cost)
    }
    if(Expense.getDateAdded() != dateAdded && dateAdded){
        Expense.setDateAdded(dateAdded)
    }
    if(Expense.getDescription() != description && description){
        Expense.setDescription(description)
    }
    if(Expense.getRecurring() != recurring && recurring != null){
        Expense.setRecurring(recurring)
    }
    if(Expense.getRecurringFreq() != recurring && recurring){
        Expense.setRecurringFreq(recurringFreq)
    }
    



})

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if(err.message == "invalid Email"){
    return res.status(400).json({error : err.message})
  }
  res.status(500).json({ error:  err.message });
};


// Server setup

app.use(errorHandler)

export default app