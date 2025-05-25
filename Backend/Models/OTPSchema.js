const mongoose = require('mongoose')
const mailSender = require('../Utils/mailSender')

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp: {
        type:Number,
        required:true
    },
    createdAt: {
        type:Date,
        default: Date.now(),
        expires:5 * 60
    }
})

// send verification to email thorugh (OTP)
async function sendVerificationEmail(email , otp) {
    try {
        const mailResponse = await mailSender(email , "Verification Email from StudyNotion" , otp)
    } catch(error) {
        console.log("Error occured while sending OTP" , error)
        throw error
    }
}

OTPSchema.pre('save' , async function (next) {
    await sendVerificationEmail(this.email , this.otp)
    next()
})

module.exports = mongoose.model('OTP' , OTPSchema)
