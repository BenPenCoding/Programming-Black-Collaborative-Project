
// Import the express in typescript file
import express, {Request,Response,NextFunction} from 'express'; //Request, Response,NextFunction used for error handling
import * as crypto from 'crypto';
import * as dbAPI from '../src/dbApiFunctions'; // functions for inserting data into neon db
import {User,Expense, Income} from './ClassDefinitions'; 

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



// POST Routes
app.post('/api/login', async (req , res, next ) => {

    try{

        const {username, password}  = req.body //  parsing request body
        // check if username or password is empty
        if(!username || !password){
            // client issue so do not send to general error handler
            return res.status(400).json({error: "Bad Request"})
            }
    
      

        const cachedUser = await dbAPI.getUserRecord(username) ; //  checking to see if in the db, userID updated  via return statement
        if(!verifyPassword(password,cachedUser.getSalt(),cachedUser.getHashedPassword())){
            return res.status(401).json({error : "Unauthorised Access"})
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
    try{


        const {firstName,lastName,username,email,password} = req.body
        if(!firstName || !lastName || !username || !email || !password ){
        
            return res.status(400).json({error : "Bad Request"})
        }
    
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

app.post('/api/updateExpense',async (req,res,next) => {
    try{

        const {expensesName,cost,dateAdded,description,userId,id,recurring,recurringFreq} = req.body
        const token  = req.headers.token as string
        if(!(token in tokenDictionary)){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const User = tokenDictionary[token]
        if(User.getUserId() != userId){
            return res.status(401).json({error: " Unauthorised Access"})
        }


        const expense = await dbAPI.getExpenseRecord(id)
        if(expense.getExpensesName() != expensesName && expensesName){
            expense.setExpensesName(expensesName)
        }
        if(expense.getCost() != cost && cost){
            expense.setCost(cost)
        }
        if(expense.getDateAdded() != dateAdded && dateAdded){
            expense.setDateAdded(dateAdded)
        }
        if(expense.getDescription() != description && description){
            expense.setDescription(description)
        }
        if(expense.getRecurring() != recurring && recurring != null){
            expense.setRecurring(recurring)
        }
        if(expense.getRecurringFreq() != recurringFreq && recurringFreq){
            expense.setRecurringFreq(recurringFreq)
        }
        await dbAPI.updateExpenseRecord(expense)

        res.status(200).send({response : "succssfully updated expense"})

    }
    catch(error){
        next(error)
    }


})

app.post('/api/updateIncome',async (req,res,next) => {
    try{
        // write in api doc this order

        const {incomeName,earning,userId,id,dateAdded,description,recurring,recurringFreq} = req.body

        const token  = req.headers.token as string
        if(!(token in tokenDictionary)){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token ]
        if(user.getUserId() != userId){
            return res.status(401).json({error: "Unauthorised Access"})
        }

        const income = await dbAPI.getIncomeRecord(id)
        if(income.getIncomeName() != incomeName && incomeName){
            income.setIncomeName(incomeName)
        }
        if(income.getEarning() != earning && earning){
            income.setEarning(earning)
        }
        if(income.getDateAdded() != dateAdded && dateAdded){
            income.setDateAdded(dateAdded)
        }
        if(income.getDescription() != description && description){
            income.setDescription(description)
        }
        if(income.getRecurring() != recurring && recurring != null){
            income.setRecurring(recurring)
        }
        if(income.getRecurringFreq() != recurring && recurring){
            income.setRecurringFreq(recurringFreq)
        }
        await dbAPI.updateIncomeRecord(income)
        res.status(200).send({response : "succssfully updated income"})


    }
    catch(error){
        next(error)
    }

})

app.post("/api/addExpense", async (req,res,next) => {
    try{
        const token = req.headers.token as string
        if(!(token in tokenDictionary)){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token]

        if(user.getUserId() != req.body.userId){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        

        const newExpense = new Expense(req.body)
        await dbAPI.AddExpense(newExpense)
        res.status(200).send({response : "succssfully added expense"})


    }
    catch(error){
        next(error)
    }

})

app.post("/api/addIncome", async (req,res ,next) =>{
    try{
        const token = req.headers.token as string
        if(!(token in tokenDictionary)){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token]

        if(user.getUserId() != req.body.userId){
            return res.status(401).json({error : "Unauthorised Access"})
        }


        const newIncome = new Income(req.body)
        await dbAPI.AddIncome(newIncome)
        res.status(200).send({response : "succssfully added income"})


    }
    catch(error){
        next(error)
    }
})

// GET Routes
app.get('/api/getUsersExpenses',async(req,res,next) =>{
    try{

        const token  = req.headers.token as string
    
        if(!(token in tokenDictionary)){
            // check to see if it is in the logged in tokenDictionary
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token];
    
        const ExpensesArr = await dbAPI.getUsersExpenses(user.getUserId())
        return res.status(200).json(ExpensesArr)

    }
    catch(error){
        next(error)
    }



})
app.get('/api/getUsersIncomes',async(req,res,next) =>{
    try{

        const token = req.headers.token as string 

        if(!(token in tokenDictionary)){
            // check to see if it is in the logged in tokenDictionary
            return res.status(401).json({error : "Unauthorised  Access"})
        }
        const user = tokenDictionary[token];
        
        const IncomesArr = await dbAPI.getUsersIncomes(user.getUserId())
        return res.status(200).json(IncomesArr)

    }
    catch(error){
        next(error)
    }



})



// DELETE Routes

app.delete("/api/DeleteExpense",async (req,res,next) => {
    try{
        const token = req.headers.token as string
        const {userId,ExpenseId} = req.body
        if(!(token in tokenDictionary )){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token]
        if( user.getUserId() != userId){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        await dbAPI.deleteExpenseRecord(ExpenseId)
        return res.status(200).json({message : "Successfully deleted the expense"})

    }
    catch(error){
        next(error)
    }

})

app.delete("/api/DeleteIncome",async (req,res,next) => {
    try{
        const token = req.headers.token as string
        const {userId,incomeId} = req.body
        if(!(token in tokenDictionary )){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token]
        if( user.getUserId() != userId){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        await dbAPI.deleteIncomeRecord(incomeId)
        return res.status(200).json({message : "Successfully deleted the expense"})

    }
    catch(error){
        next(error)
    }

})

app.delete("/api/DeleteUser",async (req,res,next) => {
    try{
        const token = req.headers.token as string
        const {userId} = req.body
        if(!(token in tokenDictionary )){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token]
        if( user.getUserId() != userId){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        await dbAPI.deleteUserRecord(userId)
        return res.status(200).json({message : "Successfully deleted the expense"})

    }
    catch(error){
        next(error)
    }

})

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if(err.message == "invalid Email"){
    return res.status(400).json({error : "Bad Request"})
  }
  res.status(500).json({ error:  err.message });
};


// Server setup

app.use(errorHandler)

export default app