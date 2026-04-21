import * as crypto from 'crypto';
// Create a SHA-256 hash of a string
const hash = crypto.createHash('sha256')
  .update('Hello, Node.js!')
  .digest('hex');
console.log('SHA-256 Hash:', hash);
if(hash == "4695813a8d1ade632d4bcf74d2e58e296883db03306149e8c78f2de0886ef665"){
    console.log("True")
}