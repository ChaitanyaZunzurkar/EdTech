const User = require('../Models/User')
const course = require('../Models/Course')
const Category = require('../Models/Categories')
const { imageUploader } = require('../Utils/imageUpload')
const Course = require('../Models/Course')
const CourseProgess = require('../Models/CourseProgess')
const { convertSecondsToDuration } = require('../Utils/secToDuration')
require('dotenv').config()

exports.createCourse = async (req , res) => {
    try {
        const { courseName , courseDescription , whatYouWillLearn  , price , category  ,tag} = req.body

        const thumbnail = req.files.thumbnailImage

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail || !category || !tag) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const userID = req.user.id
        const InstrctorDetails = await User.findById( userID )

        if(!InstrctorDetails) {
            return res.status(400).json({
                success:false,
                message:"Instructor not found"
            })
        }

        const CategoryDetails = await Category.findById( category )
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
        console.log("Fail to create a course" , error.message)
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

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;

        const course = await Course.findById( courseId );

        if(!course) {
            return console.log("Course not found!!");
        }

        if(req.files) {
            console.log("Thumbnail update")
            const updatedThumbnail = req.files.thumbnailImage;

            const thumbnailImage = await imageUploader(
                updatedThumbnail,
                process.env.FOLDER_NAME
            )

            course.thumbnail = thumbnailImage.secure_url;
        }

        Object.entries(updates).forEach(([key , value]) => {
            if(key == "tag" || key == "instructions") {
                course[key] = JSON.parse(value);
            } else {
                course[key] = value;
            }
        })          

        await course.save();
        const updatedCourse = await Course.findById(courseId)
        .populate({
            path:"instructor",
            populate: {
                path:"additionalDetails"
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate: {
                path:'subSection'
            }
        })
        .exec()

        res.status(200).json({
            success:true,
            message:"Edit course successfully.",
            data : updatedCourse
        })

    } catch (error) {
        console.log(error.message , "fail to edit course.")
        res.status(500).json({
            success:false,
            message:"Fail to edit course."
        })
    }
}

exports.getFullCourseDetails = async (req , res) => {
    try {
        const { courseId } = req.body;
        const { userId } = req.user
        const course = await Course.findById(courseId)
        .populate("category")
        .populate({
            path: "Instrctor",
            populate: {
                path: "additionalDetails"
            }
        })
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .populate("ratingAndReviews")
        .exec()

        let courseProgress = await CourseProgess.findOne({
            courseId,
            userId
        })

        if(!course) {
            return console.log("Fail to get full course details.");
        }
        
        let totalCourseDurationInSec = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subsection.forEach((subSection) => {
                const timeDurationInSec = parseInt(subSection.timeDuration);
                totalCourseDurationInSec += timeDurationInSec
            })
        })

        totalCourseDurationInSec = convertSecondsToDuration(totalCourseDurationInSec);
        return res.status(200).json({
            success: true,
            message:"fetched full course details.",
            data: {
              courseDetails,
              totalDuration,
            },
        })

    } catch(error) {
        console.log("Fail to get full course details.");
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:"Fail to get full course details."
        })
    }
}