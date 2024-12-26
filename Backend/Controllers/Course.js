const User = require('../Models/User')
const course = require('../Models/Course')
const Tag = require('../Models/Tags')
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

        const tagDetails = await Tag.findById({ tag })
        if(!tagDetails) {
            return res.status(400).json({
                success:false,
                message:"Tag not found"
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
            tag:tagDetails._id
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
        
        await Tag.findOneAndUpdate(
            {_id : tagDetails._id },
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