const mongoose = require('mongoose')
const User = require('./User')
const Categories = require('./Categories')

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
    tag: {
        type:[String],
        required:true,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Categories"
    },
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    studentEnrolled :[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        }
    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
})

module.exports = mongoose.model('Course' , CourseSchema)