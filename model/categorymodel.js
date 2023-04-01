const mongoose = require('mongoose')


const categorySchema =new mongoose.Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {type: String, Unique: true},
    
    taskList: [{type: mongoose.ObjectId, ref: 'task'}]
 })

 
 module.exports = mongoose.model('taskCategory', categorySchema)