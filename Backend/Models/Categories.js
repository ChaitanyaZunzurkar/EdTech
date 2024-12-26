const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name:{
        type:Number,
        required:true
    },
    description: {
        type:Number,
        required:true
    },
    courses: [
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true
        }
    ]
})

module.exports = mongoose.model('Category' , CategorySchema)