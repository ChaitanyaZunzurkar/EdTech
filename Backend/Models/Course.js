const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
    },
    courseDescription: {
        type:String,
        trim:true,
    },    
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        },
    ],
    ratingAndReviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews"
        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    }
})

module.exports = mongoose.model('Course' , CourseSchema)