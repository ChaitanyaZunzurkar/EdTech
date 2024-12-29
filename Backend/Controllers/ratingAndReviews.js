const { default: mongoose } = require("mongoose")
const Course = require("../Models/Course")
const RatingAndReviews = require("../Models/RatingAndReviews")
const { findById } = require("../Models/User")

exports.creatingRatingAndReviews = async (req, res) => {
    try {
        const userId = req.user.id
        if(!userId) {
            return res.status(400).json({
                success:false,
                message:"User does not found."
            })
        }

        const { courseId , rating , review } = req.body

        if(!courseId || !rating || !rating) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const student = await Course.findById(
            courseId,
            {
                studentEnrolled : { 
                    $elemMatch : {
                        $eq : userId
                    }
                 }
            }
        )

        if(!student) {
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }

        const userRatingAndReview = await RatingAndReviews.findOne(courseId, userId)

        if(userRatingAndReview) {
            return res.status(403).json({
                success:false,
                message:"User have already given rating and reviews"
            })
        }

        const ratingAndReviews = await RatingAndReviews.create({
            rating,
            review,
            course: courseId,
            user: userId
        })

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                ratingAndReviews: {
                    $push : {
                        ratingAndReviews: ratingAndReviews._id
                    }
                }
            },
            { new : true }
        )

        res.status(200).json({
            success:true,
            message: "Rating and review given by user successfully.",
            ratingAndReviews
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating a rating and reviews."
        })
    }
}

exports.getAvgCourseRating = async (req, res) => {
    try {
        const userId = req.user.id
        const { courseId } = req.body
        if(!courseId) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const avgRating = await RatingAndReviews.aggregate([
            {
                $match: {
                    course : new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group : {
                    _id: null,
                    avgrageRating : { $avg : "$rating"}
                }
            }
        ])

        if(avgRating.length > 0) {
            return res.status(200).json({
                success:true,
                avgRating: avgRating[0].avgrageRating
            })
        }

        return res.status(200).json({
            success:true,
            avgRating: 0,
            message:"No rating till now."
        })
    } catch(error) {
        console.log("Fail to get the avg. of course rating" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to get the avg. of course rating"
        })
    }
}