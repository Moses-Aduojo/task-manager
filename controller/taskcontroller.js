const task = require('../model/taskmodel')
const User = require('../model/usermodel')
const taskCategory = require("../model/categorymodel")

const isLogin = require('../middleware/islogin')
//const { uptdateCategory } = require('./categoriescontroller')
//const obtainTokenFromHeader = require('../util/obtaintoken')

//clear completed task
//completed task


//get all tasks for a specific user
const getTask = async( req, res,)=>{
    try{
        const Task = await task.find({user:req.userAuth})
        if (!Task){
            res.json({message: "task not found"})
        }else{
            res.status(200).json(Task)
        }
    }catch(error){
        res.json(error.message)
    }
    
}

const getSpecificTask = async( req, res,)=>{
    try{
        const Task = await task.findById(req.params.id)
        if (!Task){
            res.json({message: "task not found"})
        }else{
            res.status(200).json(Task)
        }
    }catch(error){
        res.json(error.message)
    }
    
}



const setTask = async( req, res,)=>{
    const {text, category} = req.body
    try{
        if (!req.body) {
            res.status(400)
            throw new Error('please add fields')
        }

        const findCategory = await taskCategory.findOne({category})
        if(!taskCategory){
            return res.json({message: "add your task to a category"})
        }

        const finduser = await User.findById(req.userAuth)
        const Task = await task.create({
            user: req.userAuth,
            category:findCategory._id,
            text: text,
         })

        findCategory.taskList.push(Task._id)
        findCategory.save()

        res.status(200).json(Task)
        console.log(Task)
        
    }catch(error){
        res.json(error.message)
    }
}



const updateTask = async( req, res,)=>{
    const Task = await task.findById(req.params.id)
    try{
        if (!Task){
            res.status(400)
            throw new Error('task not found')
        }else{
            const updatedtask = await task.findByIdAndUpdate(req.params.id, req.body, {new: true,})
             updatedtask.save()
             res.status(200).json(updatedtask)
        }
    }catch(error){
        res.json(error.message)
    }
}


const completeTask = async(req, res)=>{
    const completedTask = await task.findById(req.params.id)
    const userWhoCompleteTheTask = await User.findById(req.userAuth)
    try{
        if(!completedTask){
            return res.json({message: "task does not exist"})
        }else{
            userWhoCompleteTheTask.completed.push(completedTask)
            userWhoCompleteTheTask.save()
            task.findByIdAndRemove(req.params.id)
            task.save()
            res.json({message:"successful"})
        }
    }catch(error){
        res.json(error.message)
    }
}
    

const deleteTask = async( req, res,)=>{

    try{
        const Task = await task.findById(req.params.id)
    
    if (!Task){
        res.status(400)
        throw new Error('task not found')
    }else{
        const taskTodelete = await task.findByIdAndDelete(req.params.id)
        res.status(200).json({message:' deleted successfully'}) 
    }

    }catch(error){
        res.json(error.message)
    }
  
}


module.exports = {getTask, setTask, getSpecificTask, updateTask, completeTask, deleteTask}



