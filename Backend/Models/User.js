const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin , Student" , "Instrctor"],
        require:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Profile'
    },
    image: {
        type:String,
        require:true
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]
})

module.exports = mongoose.model('User' , userSchema)
