const mongoose = require('mongoose')
const User = require('../model/usermodel')
const taskcategory = require("../model/categorymodel")


const taskSchema =  new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'taskcategory'
    },


    text: {
        type: String,
        //duration: Date,
        //target: String,
        required: [true, 'please add a text value']
    }
}, )

module.exports = mongoose.model('task', taskSchema)

