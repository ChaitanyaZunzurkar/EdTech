const { default: mongoose } = require('mongoose')
const { instance } = require('../Config/razorpay')
const Course = require('../Models/Course')
const User = require('../Models/User')
const { mailSender } = require('../Utils/mailSender')
const crypto = require('crypto')

exports.createPayment = async (req,res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.userId

        if(!courseId || !userId) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields."
            })
        }

        const CourseDetails = await Course.findOne(courseId)
        if(!CourseDetails) {
            return res.status(400).json({
                success:false,
                message:"Course not found."
            })
        }

        const uid = new mongoose.Types.ObjectId(userId)
        if(CourseDetails.studentEnrolled.includes(uid)) {
            return res.status(400).json({
                success:false,
                message:"Student is already enrolled."
            })
        }     

        const price = CourseDetails.price
        const currancy = "INR"

        const options = {
            price: price*100,
            currancy,
            recipt: Math.random(Date.now()).toString(),
            notes:{
                courseId: CourseDetails._id,
                userId
            }
        }

        try {
            const paymentResponse = await instance.orders.create(options)
            console.log(paymentResponse)
        } catch(error) {
            console.log("Could not initaite order" , error.message);
            return res.status(500).json({
                success:false,
                message:"Could not initaite order"
            })
        }

        res.status(200).json({
            success:true,
            message:"Payment created successfully.",
            courseName : CourseDetails.courseName,
            courseDescription:CourseDetails.courseDescription,
            price:CourseDetails.price,
            orderId: paymentResponse.id,

        })
    } catch(error) {
        console.log("Fail to create a payment" , error.message);
        return res.status(500).json({
            success:false,
            message:"Fail to create a payment."
        })
    }
}

exports.verifiSignature = async (req, res) => {
    try {
        const webHookSecret = "ThisIsMySecretKeyForTheStudyNotionApp"
        const signature = req.headers["x-rozorpay-signature"];

        const shasum = crypto.createHmac("sha256" , webHookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest("hex")

        if(signature === digest) {
            console.log("Payment is Authorised")
            const { courseId , userId } = req.body.payload.payment.entity.notes
            
            try {
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id: courseId},
                    { 
                        $push :{
                            studentEnrolled: userId
                        }
                    },
                    { new : true }
                )

                if(!enrolledCourse) {
                    return res.status(400).json({
                        success:false,
                        message:"Fail to find course"
                    })
                }

                const enrolledUser = await User.findOneAndUpdate(
                    {_id: userId},
                    {
                        $push :{
                            courses: courseId
                        },
                    },
                    { new : true }
                )

                if(!enrolledUser) {
                    return res.status(400).json({
                        success:false,
                        message:"Fail to find user"
                    })
                }

                const mailResponse = await mailSender(enrolledUser , "Baad me template daale dege" , "Baad me template daale dege")
                res.status(200).json({
                    success:true,
                    message:"Signature verified"
                })
            } catch (error) {
                res.status(500).json({
                    success:false,
                    message:"Fail to enroll student in course"
                })
            }
            
        } else {
            return res.status(400).json({
                success:false,
                message: "Invalid request"
            })
        }

    } catch(error) {
        console.log("Fail to verfiy signnature" , error.message);
        return res.status(500).json({
            success:false,
            message: "Fail to verfiy signnature"
        })
    }
}