const Profile = require('../Models/Profile')
const User = require("../Models/User")
const Course = require('../Models/Course')

exports.updateProfile = async (req, res) => {
    try {
        const { gender , dateOfBirth , about , contactNumber } = req.body
        const userId = req.user.id
        if(!gender || !dateOfBirth || !about ||!contactNumber) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
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
            success:true,
            message:"Profile Updated successfully.",
            profile: profile
        })

    } catch(error) {
        console.log("Fail to update the profile." , error.message);
        return res.status(500).json({
            success:false,
            message:"Fail to update Profile."
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        if(!user) {
            return res.status(400).json({
                success:false,
                message:"User does not found."
            })
        }

        const profileId = user.additionalDetails
        const profile = await Profile.findByIdAndDelete(profileId)

        const courseId = user.courses
        const removeStudentFromCourse = await Course.findByIdAndDelete(courseId)

        const deleteinUser = await User.findByIdAndDelete(userId)
        res.status(200).json({
            success:true,
            message:"user deleted successfully."
        })

    } catch(error) {
        console.log("Fail to delete the profile." , error.message);
        return res.status(500).json({
            success:false,
            message:"Fail to delete Profile."
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const userId = req.user.id

        const userDetails = await User.findById(userId).populate("additionalDetails").exec()

        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"User does not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Displayed user details successfully."
        })

    } catch(error) {
        console.log("Fail to fetch all users." , error.message);
        return res.status(500).json({
            success:false,
            message:"Fail to fetch all users."
        })
    }
}