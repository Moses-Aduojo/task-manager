const express = require('express');
//const{getCategory, addCtegory, updateCategory, deleteCategory} = require('../controller/taskcontroller');
const { addCategory, getCategory, uptdateCategory, deleteCategory} = require('../controller/categoriescontroller');
const isLogin = require('../middleware/islogin');

const categoryRouter = express.Router()


categoryRouter.get('/', isLogin, getCategory)

categoryRouter.post('/',isLogin, addCategory)

categoryRouter.put('/:id', isLogin, uptdateCategory)

categoryRouter.delete('/:id',isLogin, deleteCategory)


module.exports = categoryRouter