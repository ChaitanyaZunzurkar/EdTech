const Profile = require('../Models/Profile')
const User = require("../Models/User")
const Course = require('../Models/Course')
const { imageUploader } = require('../Utils/imageUpload')
const { convertSecondsToDuration } = require("../Utils/secToDuration")
const CourseProgress = require("../Models/CourseProgess")
require('dotenv').config()

exports.updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth, about, contactNumber } = req.body
        const userId = req.user.id
        if (!gender || !dateOfBirth || !about || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields."
            })
        }

        const user = await User.findById(userId)
        const profileId = user.additionalDetails

        const profile = await Profile.findById(profileId)
        profile.gender = gender
        profile.about = about
        profile.dateOfBirth = dateOfBirth
        profile.contactNumber = contactNumber

        await profile.save()
        res.status(200).json({
            success: true,
            message: "Profile Updated successfully.",
            profile: profile
        })

    } catch (error) {
        console.log("Fail to update the profile.", error.message);
        return res.status(500).json({
            success: false,
            message: "Fail to update Profile."
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not found."
            })
        }

        const profileId = user.additionalDetails
        const profile = await Profile.findByIdAndDelete(profileId)

        const courseId = user.courses
        const removeStudentFromCourse = await Course.findByIdAndDelete(courseId)

        const deleteinUser = await User.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            message: "user deleted successfully."
        })

    } catch (error) {
        console.log("Fail to delete the profile.", error.message);
        return res.status(500).json({
            success: false,
            message: "Fail to delete Profile."
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const userId = req.user.id

        const userDetails = await User.findById(userId).populate("additionalDetails").exec()

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User does not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Displayed user details successfully.",
            userDetails
        })

    } catch (error) {
        console.log("Fail to fetch all users.", error.message);
        return res.status(500).json({
            success: false,
            message: "Fail to fetch all users."
        })
    }
}

exports.updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id
        const profilePicture = req.files.profilePicture
        if (!profilePicture || !userId) {
            return res.status(500).json({
                success: false,
                message: "Please fill all the required fields."
            })
        }

        const profilePictureUploadResponse = await imageUploader(profilePicture, process.env.FOLDER_NAME)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                image: profilePictureUploadResponse.secure_url
            },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully.",
            updatedUser
        })

    } catch (error) {
        console.log("Fail to update profile picture", error.message)
        return res.status(500).json({
            success: false,
            message: "Fail to update profile picture."
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()
        console.log(userDetails)
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findById(userId)
        .populate({
            path: "courses",
            populate: {
                path:"courseContent",
                populate: {
                    path: "subSection"
                }
            }
        })
        .exec()

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnroled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats
        })

        res.status(200).json({ courses: courseData })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}