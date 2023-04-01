
const express = require('express');
const{login, register, getSpecificUser, Update, Delete} = require('../controller/usercontroller');
const isLogin = require('../middleware/islogin');

const userRouter = express.Router()


userRouter.route('/login').post(login)

userRouter.route('/register').post(register)

userRouter.get('/profile', isLogin, getSpecificUser)

userRouter.put('/', Update)

userRouter.delete('/', Delete)


module.exports = userRouter