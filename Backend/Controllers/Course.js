const User = require('../Models/User')
const course = require('../Models/Course')
const Category = require('../Models/Categories')
const { imageUploader } = require('../Utils/imageUpload')

exports.createCourse = async (req , res) => {
    try {
        const { courseName , courseDescription , whatYouWillLearn  , price , tag} = req.body

        const thumbnail = req.files.thumbnailImage

        if(!courseName || !courseDescription || !instructor || !whatYouWillLearn || !price || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const userID = req.user.id
        const InstrctorDetails = await User.findById({ userID })

        if(!InstrctorDetails) {
            return res.status(400).json({
                success:false,
                message:"Instructor not found"
            })
        }

        const CategoryDetails = await Category.findById({ tag })
        if(!CategoryDetails) {
            return res.status(400).json({
                success:false,
                message:"Category not found"
            })
        }

        const thumbnailImage = await imageUploader(thumbnail , process.env.FOLDER_NAME)
        const courseDetails = await course.create({
            courseName,
            courseDescription,
            instructor: InstrctorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailImage.secure_url,
            Category:CategoryDetails._id
        })

        await User.findOneAndUpdate(
            { _id: InstrctorDetails._id },
            {
                $push :{
                    courses : courseDetails._id
                }
            },
            { new : true }
        )
        
        await Category.findOneAndUpdate(
            {_id : CategoryDetails._id },
            {
                $push : {
                    courses: courseDetails._id
                }
            },
            { new: true}
        )

        res.status(201).json({
            success:true,
            message:"Course created successfully",
            courseDetails
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Fail to create a course."
        })
    }
}


exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await course.find({ } , {
            courseName:true,
            courseDescription:true,
            price:true,
            ratingAndReviews:true,
            studentEnrolled:true,
            instructor:true,
            thumbnail:true
        }).populate("instructor").exec()

        if(!allCourses) {
            return res.status(400).json({
                success:false,
                message:"Courses not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"All courses fetched",
            allCourses
        })

    } catch(error) {
        console.error("Fail to show all the courses" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to fetch all course details"
        })
    }
}

exports.getCourseDetails = async (req, res) => {
    try { 
        const { courseId } = req.body

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required.",
            });
        }

        const courseDetails = await course.findById(
            courseId
        ).populate({
            path:"instructor",
            populate: {
                path: "additionalDetails",
            }
        }).populate({
            path:"courseContent",
            populate: {
                path: "SubSection"
            }
        }).populate("Category").populate("ratingAndReviews").exec()
    
        
        if(!courseDetails) {
            res.status(400).json({
                success:false,
                message:"Course does not found"
            })
        }

        res.status(200).json({
            success:true,
            message: "got the course details",
            course : {
                courseName:courseDetails.courseName,
                courseDescription: courseDetails.courseDescription,
                instructor: courseDetails.instructor,
                whatYouWillLearn:courseDetails.whatYouWillLearn,
                courseContent: courseDetails.courseContent,
                ratingAndReviews: courseDetails.ratingAndReviews,
                price: courseDetails.price,
                thumbnail: courseDetails.thumbnail,
            }
        })
    } catch(error) {
        res.status(500).json({
            success:false,
            message:"Fail to get entire course details"
        })
    }
}