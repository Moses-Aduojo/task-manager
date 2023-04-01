const User = require('../model/usermodel')
const bcrypt = require('bcrypt');
const generateToken = require('../util/generatetoken');
const obtainTokenFromHeader = require('../util/obtaintoken');
//const obtainTokenFromHeader = require('../util/obtaintoken');



const register = async( req, res,)=>{
  const {firstname, lastname, email, password} = req.body;
   const findUser = await User.findOne({email})
    try{
        if(findUser){

            throw new Error('you have previously register')
            
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password, salt);
            const _user = await User.create({
                firstname,
                lastname,
                email,
                password: hashedpassword
            })
            return res.json({
                status: "success",
                details: _user
            })
        }
   }catch(error){
    res.json(error.message)
   }
}



const login = async( req, res,)=>{
    const {email, password} = req.body
    try{
        const findUser = await User.findOne({email})
        if(!findUser){
            return res.json({ message: "invalid detail"})
        }
        
        const findPassword = await bcrypt.compare(password, findUser.password)
        if(!findPassword){
             return res.json({
                message: "invalid details"
            })
        }else{
            res.json({
                 status: "success",
                 firstname: findUser.firstname,
                 lastname: findUser.lastname,
                 email: findUser.email,
                 token: generateToken(findUser._id)
             })
         }
    }catch(error){
        res.json(error.message)
    }
}





const getSpecificUser = async(req, res)=>{
    try{
        const findUser = await User.findById(req.userAuth)
        if(findUser){
           return res.json({status: "success", message: findUser, })
        }else{
            return res.json({message: "user does not exist"})
        }
       
    }catch(error){
        res.json(error.message)
    }
}

const Update = async( req, res,)=>{
    try{
        const findUser = await User.findById(req.userAuth)
        if(!findUser){
            return res.json({message: "user does not exist"})
        }else{
            await User.findByIdAndUpdate(req.userAuth, req.body)
            User.save()
            res.status(200).json({message:'successfull'})
        }
    }catch(eerror){
        res.json(error.message)
    }
}


const Delete= async( req, res,)=>{
    try{
        const findUser = await User.findById(req.userAuth)
        if(!findUser){
            return res.json({message: "user does not exist"})
        }else{
            await User.findByIdAndRemove(req.userAuth, req.body)
            User.save()
            res.status(200).json({message:'successfull'})
        }
    }catch(eerror){
        res.json(error.message)
    }
}


module.exports = {login, register, getSpecificUser, Update, Delete}

