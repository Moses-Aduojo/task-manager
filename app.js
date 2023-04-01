
const mongoose = require('mongoose')
const express = require ('express');
const taskRouter = require('./route/taskroute')
const userRouter = require('./route/userroute')
const dbConnect = require('./config/dbconnect');
//const isLogin = require('./middleware/islogin');
const categoryRouter = require('./route/categoriesroute');


mongoose.connect('mongodb://127.0.0.1:27017/TaskDb');
//dbConnect(),
require('dotenv').config();
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/api/goals/task', taskRouter)
app.use('/api/goals/user', userRouter)
app.use('/api/goals/taskcategories',  categoryRouter)

app.listen(port, ()=> {
    console.log(`cool app is listening on port ${port}`)
})