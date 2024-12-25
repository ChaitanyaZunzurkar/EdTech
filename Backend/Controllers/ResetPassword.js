const User = require('../Models/User')
const mailSender = require('../Utils/mailSender')
require('dotenv').config()
const bcrypt = require('bcrypt')

exports.resetPasswordToken = async (req , res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({
                succcess:false,
                message:"Fail to get email"
            })
        }

        const user = await User.findOne({ email })
        
        const token = crypto.randomUUID();

        const updateDetails = await User.findOneAndUpdate(
            { email },
            { token : token ,  resetPassword: Date.now() * 5 * 60 * 1000},
            { new : true }
        )

        const URL = `http://localhost:5000/update-password/${token}`
        await mailSender(email , "Password Rest Link" , `Password Reset Link : ${URL}`)

        return res.json({
            success:true,
            message:"Email sent successfully, please check email and change password"
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message:"Fail to sent reset password link to user."
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password , confirmPassword , token } = req.body

        if(!password || !confirmPassword || token) {
            return res.status(400).json({
                success:false,
                message:"Fail to get password or confirm password or token"
            })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"password and confirm password does not match"
            })
        }

        const userDetails = await User.findOne({ token })

        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        if(userDetails.resetPasswordExpires  < Date.now()) {
            return res.status(400).json({
                success:false,
                message:"Token expires"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        await User.findOneAndUpdate(
            { token : token },
            { password : hashedPassword },
            { new : true }
        )

        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })
        
    }catch(error) {
        return res.status(400).json({
            success:false,
            message:"Fail to reset password"
        })
    }
}