const mongoose = require('mongoose')

const TagsSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Tags' , TagsSchema)