// import "dotenv/config";
import { env } from "./config/env.js";
import app from './app.js';

app.listen(3000, () => console.log("Server on http://localhost:3000"));

app.get('/', (req,res) => {
    res.send('backend is running');
})