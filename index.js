const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()

//regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

//cookie middleware
app.use(cookieParser()) 
const userRouter = require('./routes/userRoutes')

//using the express router as a middleware
app.use('/api', userRouter)

app.get('/', (req,res)=>{
    res.send("Hi from Prisma Backend Project")
})  
app.listen(4444, ()=>{
    console.log('Server is running on port 4444');
})