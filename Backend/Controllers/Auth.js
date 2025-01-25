const User =  require('../Models/User.js')
const OTP = require('../Models/OTPSchema.js')
const otpGenerator = require('otp-generator')
const Profile = require('../Models/Profile.js')
const mailSender = require('../Utils/mailSender')
const emailVerificationTemplate = require('../Emails/Templates/emailVerificationTemplate.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.otpSender = async (req, res) => {
    try {
        // destrcture email from the request 
        const { email } = req.body
        
        // check whether user with the give email already exist or not 
        const existingUser = await User.findOne({ email })

        // if user's email already exists return response
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        // if user's email is unique 
        const otp = otpGenerator.generate(6 , {
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        // check if otp generated is unique or not
        const isUniqueOTP = await OTP.findOne({ otp })

        // generate till we get unique otp
        while(isUniqueOTP) {
            const otp = otpGenerator.generate(6 , {
                upperCaseAlphabets: false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            isUniqueOTP = await OTP.findOne({ otp })
        }
        const userOTP = await OTP.create({
            email,
            otp
        })

        const mailResponse = await mailSender(email , "Sending OTP for email verification : " , emailVerificationTemplate(otp))

        res.status(200).json({
            success:true,
            message:"OTP send successfully",
            otp
        })

    } catch(error) {
        console.error("Fail to generate OTP : " , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to generate OTP"
        })
    }
}


exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body

        if(!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber || !otp) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Password and confirm password are differnt. Please try again."
            })
        }

        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)

        if(recentOTP.length === 0) {
            return res.status(400).json({
                success:false,
                message:"Cannot found a valid OTP"
            })
        }
        else if (recentOTP[0].otp !== otp) {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            contactNumber,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(firstName)}%20${encodeURIComponent(lastName)}&style=initials&backgroundColor=ff5733&fontSize=64`
        })

        res.status(201).json({
            success:true,
            message:"User signup successfully",
            user
        })
    } catch(error) {
        console.error("Fail to signup : " , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to signup"
        })
    }
}

exports.signin = async (req, res) => {
    try {
        const { email , password } = req.body

        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }
        const user = await User.findOne({ email }).populate('additionalDetails')

        if(!user) {
            return res.status(403).json({
                success:false,
                message:"User does not exists."
            }) 
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({
                success:false,
                message:"Password incorrect!!! Please enter a correct password."
            })
        }

        try {
            const playlod = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token = jwt.sign(playlod, process.env.JWT_SECRET_KEY , {
                expiresIn:"2h"
            })
            user.token = token 
            user.password = undefined

            const options = {
                expiresIn: Date.now() * 3 * 24 * 60 * 60 * 1000,
                httpOnly:true
            }
            res.cookie('token' , token , options).status(200).json({
                success:true,
                message:"User signin successfully",
                user: user,
                token: user.token
            })

        } catch(error) {
            console.error("Fail to generate token" , error.message)
            return res.status(500).json({
                success:false,
                message:"Fail to generate the token"
            })
        }

    } catch (error) {
        console.error("Fail to signin" , error.message)
        return res.status(500).json({
            success:false,
            message:"Fail to signin"
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        // destructuring the user info
        const { email , oldPassword , newPassword , confirmPassword } = req.body;

        // validation 
        if(!email || !oldPassword || !newPassword || confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Confirm password does not match"
            })
        }

        const userDetails = await User.findOne({ email })
        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"User does not exists."
            })
        }

        if(userDetails.password !== oldPassword) {
            return res.status(400).json({
                success:false,
                message:"Old password does not match. Please try again later"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword , salt)

        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new : true }
        )

    } catch(error) {
        return res.status(500).json({
            success:false,
            message: "Fail to change the password"
        })
    }
} 