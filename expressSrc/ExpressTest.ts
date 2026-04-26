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