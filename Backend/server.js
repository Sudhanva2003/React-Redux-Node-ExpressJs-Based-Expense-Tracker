import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import expenseRoutes from './routes/expenseRoutes.js';



const app=express();
//defines the express app,which defines routes, middleware and other server configs
app.use(cors());
//cross origin resource sharing, your server can handle requests from diff origins,
//ega  react frontend is running on a different port it (in our case 5173)
app.use(bodyParser.json());
//frontend sends json data to the backend, this middleware parses it and stores it in
//req.data
app.use('/api/expenses',expenseRoutes);
//this sets up a route for all requests starting with api/expenses,
//this expenseRoutes defined in backend flder will have the handling logic
const PORT=5000;
app.listen(PORT,()=>{
   console.log(`server is running on port ${PORT}`);
});
//starts the server makes it listen to incoming requests on specified port




