const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({
    setionName:{
        type:String,
        trim:true,
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            trim:true,
            ref:"SubSection"
        }
    ],    
})

module.exports = mongoose.model('Section' , SectionSchema)