import * as crypto from 'crypto';
const password = "DBPass"
const hashPassword = crypto.createHash('sha256')
        .update(password)
        .digest('hex');
console.log(hashPassword)