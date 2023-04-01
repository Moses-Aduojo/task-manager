
const express = require('express');
const{getTask, setTask, getSpecificTask, updateTask, completeTask, deleteTask,} = require('../controller/taskcontroller');
const isLogin = require('../middleware/islogin');

const taskRouter = express.Router()


taskRouter.get("/",  isLogin, getTask)

taskRouter.post("/", isLogin, setTask)

taskRouter.get('/:id',  isLogin, getSpecificTask)

taskRouter.get('/complete/:id',  isLogin, completeTask)

taskRouter.put("/:id", isLogin, updateTask)

taskRouter.delete("/:id", deleteTask)

module.exports = taskRouter