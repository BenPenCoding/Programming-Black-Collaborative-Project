/*
import { json } from "node:stream/consumers"
import crypto from "crypto"

class v1{
        private var1 : string
        private var2 : string

        public constructor(var1 : string,var2 : string){
                this.var1 = var1
                this.var2 = var2
        }
}
const V1 = new v1("s","b")
const V2 = new v1("a","c")

console.log(JSON.stringify([V1,V2]))
// Generate random bytes
const randomBytes = crypto.randomBytes(16);

console.log('Random bytes:', randomBytes.toString('hex'));

// Function to hash a password
function hashPassword(password : string) {
  // Generate a random salt (16 bytes)
  const salt = crypto.randomBytes(16).toString('hex');

  // Use scrypt for password hashing (recommended)
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');

  // Return both salt and hash for storage
  return { salt, hash };
}

// Function to verify a password
function verifyPassword(password : string, salt : string, hash : string) {
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  return hashedPassword === hash;
}

// Example usage
const password = 'DBPass';

// Hash the password for storage
const { salt, hash } = hashPassword(password);
console.log('Salt:', salt);
console.log('Hash:', hash);

// Verify a login attempt
const isValid = verifyPassword(password, salt, hash);
console.log('Password valid:', isValid); // true

const isInvalid = verifyPassword('wrongPassword', salt, hash);
console.log('Wrong password valid:', isInvalid); // false


function validateEmail(inputEmail : string): boolean{ // basic email validation
        const regex : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regex.test(inputEmail)){
            return true 

        }
        return false
}

console.log(validateEmail("zfdf79@durham.ac.uk"))
*/

