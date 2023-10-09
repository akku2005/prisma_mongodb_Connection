 const cookieParser = require("cookie-parser");
const express = require("express")
require("dotenv").config();
 const app = express();


 //regular middleware

 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 //use cookie-parser as middleware
 app.use(cookieParser());

 const userRouter = require("./routes/userRoutes");
 app.use('/api',userRouter)

 app.get("/",(req,res)=>{
    res.send("Hi from Akash");
 })

 app.listen(3000,()=>{
    console.log("Server is running on port 3000");
 })