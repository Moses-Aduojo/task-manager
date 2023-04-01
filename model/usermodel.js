const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'please add a text value']
    },

    lastname: {
        type: String,
        required: [true, 'please add a text value']
    },
    email: {
        type: String,
        required: [true, 'please add a text value'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add a text value'],
    },
    taskcategory: [{type: mongoose.ObjectId, ref: 'category'}],
    
    completed: [],
    
    uncompleted: []
},
 {
    timestamps: true,
    toJson: {virtual: true}
})


module.exports = mongoose.model('User', userSchema)