// Take a port 3000 for running server.
import app from "./app"

const port = Number(process.env.PORT) || 3000;


app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});