
// Import the express in typescript file
import express, {Request,Response,NextFunction} from 'express'; //Request, Response,NextFunction used for error handling
import * as crypto from 'crypto';
import * as dbAPI from '../src/dbApiFunctions'; // functions for inserting data into neon db
import {User,Expense, Income} from './ClassDefinitions'; 

// Initialize the express engine



// might have to wrap parse request in try catches


const app: express.Application = express();

app.use(express.static('./client'));


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
        const user = tokenDictionary[token]
        if(user.getUserId() != userId){
            return res.status(401).json({error: " Unauthorised Access"})
        }


        const expense = await dbAPI.getExpenseRecord(id)
       if (expense.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" })
        }


        if(expense.getExpensesName() != expensesName && expensesName != null){
            expense.setExpensesName(expensesName)
        }
        if(expense.getCost() != cost && cost){
            expense.setCost(cost)
        }
        if(expense.getDateAdded() != dateAdded && dateAdded != null){
            expense.setDateAdded(dateAdded)
        }
        if(expense.getDescription() != description && description != null){
            expense.setDescription(description)
        }
        if(expense.getRecurring() != recurring && recurring != null){
            expense.setRecurring(recurring)
        }
        if(expense.getRecurringFreq() != recurringFreq && recurringFreq != null){
            expense.setRecurringFreq(recurringFreq)
        }
        await dbAPI.updateExpenseRecord(expense)

        res.status(200).send({response : "successfully updated expense"})

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
          
        if (income.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" })
        }

        if(income.getIncomeName() != incomeName && incomeName != null){
            income.setIncomeName(incomeName)
        }
        if(income.getEarning() != earning && earning != null){
            income.setEarning(earning)
        }
        if(income.getDateAdded() != dateAdded && dateAdded != null){
            income.setDateAdded(dateAdded)
        }
        if(income.getDescription() != description && description != null){
            income.setDescription(description)
        }
        if(income.getRecurring() != recurring && recurring != null){
            income.setRecurring(recurring)
        }
        if(income.getRecurringFreq() != recurringFreq && recurringFreq != null){
            income.setRecurringFreq(recurringFreq)
        }
        await dbAPI.updateIncomeRecord(income)
        res.status(200).send({response : "successfully updated income"})


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
        res.status(200).send({response : "successfully added expense"})


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
        res.status(200).send({response : "successfully added income"})


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

app.delete("/api/deleteExpense",async (req,res,next) => {
    try{
        const token = req.headers.token as string
        const {userId,expenseId} = req.body
        if(!(token in tokenDictionary )){
            return res.status(401).json({error : "Unauthorised Access"})
        }
        const user = tokenDictionary[token]
        if( user.getUserId() != userId){
            return res.status(401).json({error : "Unauthorised Access"})
        }

        const expense = await dbAPI.getExpenseRecord(expenseId)
        if (expense.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" })
        }
        await dbAPI.deleteExpenseRecord(expenseId)
        return res.status(200).json({message : "Successfully deleted the expense"})

    }
    catch(error){
        next(error)
    }

})

app.delete("/api/deleteIncome",async (req,res,next) => {
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

        const income = await dbAPI.getIncomeRecord(incomeId)
          
       if (income.getUserId() !== user.getUserId()) {
            return res.status(403).json({ error: "Forbidden" })
        }
        await dbAPI.deleteIncomeRecord(incomeId)
        return res.status(200).json({message : "Successfully deleted the income"})

    }
    catch(error){
        next(error)
    }

})

app.delete("/api/deleteUser",async (req,res,next) => {
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
        
        delete tokenDictionary[token]

        return res.status(200).json({message : "Successfully deleted the user"})

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