const taskCategory = require("../model/categorymodel")
const User = require('../model/usermodel')

const addCategory = async( req, res,)=>{
  try{
    if (!req.body.category) {
      res.status(400)
      throw new Error('please add a text field')
  }else{
    const finduser = await User.findById(req.userAuth)
    const Category = await taskCategory.create({
      user: req.userAuth,
      category: req.body.category
    })
    finduser.taskcategory.push(Category._id)
    finduser.save()
    res.json(Category)
  }
  }catch(error){
    res.json(error.message)
  }
}

//get all category for a specific user
const getCategory = async( req, res,)=>{
  try{
    const finduser = await User.findById(req.userAuth)
    res.json(finduser.taskcategory)
  }catch(error){
    res.json(error.message)
  }
    
 }

 const uptdateCategory = async( req, res,)=>{
  try{
    const categoryToUpdate = await taskCategory.findByIdAndUpdate(req.params.id, req.body)
    categoryToUpdate.save()
  }catch(error){
    res.json(error.message)
  }
}
    
 const deleteCategory = async( req, res,)=>{
  try{
    const categoryToDelete = await taskCategory.findByIdAndRemove(req.params.id, req.body)
    categoryToDelete.save()
  }catch(error){
    res.json(error.message)
  }
 }

 module.exports = {addCategory, getCategory, uptdateCategory, deleteCategory}