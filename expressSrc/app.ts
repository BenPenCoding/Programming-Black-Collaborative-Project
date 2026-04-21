// Import the express in typescript file
import express, {Request,Response,NextFunction} from 'express'; //Request, Response,NextFunction used for error handling
import * as crypto from 'crypto';

import * as dbAPI from '../src/dbApiFunctions'; // functions for inserting data into neon db
import {User,Expense} from './ClassDefinitions'; 
// Initialize the express engine



const app: express.Application = express();




// Take a port 3000 for running server.
const port: number = 3000;

// middleware`
app.use(express.json())

// cached user token map
const tokenDictionary : {[token:string] : User} = {}

app.post('/api/login', async (req , res, next ) => {


    const {username, password}  = req.body //  parsing request body

    try{
        // Create a SHA-256 hash of a string
        const hashPassword = crypto.createHash('sha256')
        .update(password)
        .digest('hex');
        const cachedUser = await dbAPI.getUserRecord(username,hashPassword) ; //  checking to see if in the db

        // create an auth token

        const unParsedToken = Math.random().toString()
        const token = unParsedToken.slice(2,)
        
        tokenDictionary[token] = cachedUser
        res.status(200).json({token})


    }
    catch(error){
        next(error)

    }
});
app.get('/api/signup', (_req,_res) => {

});


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ "error":  "Internal Server Error"  });
};


// Server setup

app.use(errorHandler)


app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});