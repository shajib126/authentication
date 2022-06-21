const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"]
    },
    email:{
        type:String,
        required:[true,'please enter your email']
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[6,"password should be greater than 6 charecter"]
    }
})

module.exports = mongoose.model('User',userSchema)