"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Take a port 3000 for running server.
const app_1 = __importDefault(require("./app"));
const port = Number(process.env.PORT) || 3000;
app_1.default.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});
