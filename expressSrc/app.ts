// Import the express in typescript file
import express from 'express';
import * as dbAPI from '../src/dbApiFunctions';
import {User,Expense} from './ClassDefinitions';
// Initialize the express engine



const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3000;

// middleware
app.use(express.json())

// cached user
let cachedUser : User | null ; // most recent successfull log in 


// Token
let token: string;

app.post('/api/login', async (_req , _res ) => {


    const {username, password}  = _req.body

    try{
        cachedUser = await dbAPI.getUserRecord(username,password) ;
        //
        const unParsedToken = Math.random().toString()
        token = unParsedToken.slice(2,)


    }
    catch(error){
        console.log(error)

    }
});
app.get('/api/signup', (_req,_res) => {

});

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});