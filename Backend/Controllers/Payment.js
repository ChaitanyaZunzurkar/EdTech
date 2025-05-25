const { default: mongoose } = require('mongoose')
const { instance } = require('../Config/razorpay')
const Course = require('../Models/Course')
const User = require('../Models/User')
const mailSender = require('../Utils/mailSender')
const crypto = require('crypto')
const Razorpay = require('razorpay')
const CourseProgess = require('../Models/CourseProgess')
const { paymentSuccessEmail } = require('../Emails/Templates/PaymentSuccessEmail')
const courseEnrollmentEmail = require('../Emails/Templates/CourseEnrollemntTemplate')

// this is backend code for buying single item 

// exports.createPayment = async (req,res) => {
//     try {
//         const { courseId } = req.body
//         const userId = req.user.userId

//         if(!courseId || !userId) {
//             return res.status(400).json({
//                 success:false,
//                 message:"Please fill all the required fields."
//             })
//         }

//         const CourseDetails = await Course.findOne(courseId)
//         if(!CourseDetails) {
//             return res.status(400).json({
//                 success:false,
//                 message:"Course not found."
//             })
//         }

//         const uid = new mongoose.Types.ObjectId(userId)
//         if(CourseDetails.studentEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success:false,
//                 message:"Student is already enrolled."
//             })
//         }     

//         const price = CourseDetails.price
//         const currancy = "INR"

//         const options = {
//             price: price*100,
//             currancy,
//             recipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId: CourseDetails._id,
//                 userId
//             }
//         }

//         try {
//             const paymentResponse = await instance.orders.create(options)
//             console.log(paymentResponse)
//         } catch(error) {
//             console.log("Could not initaite order" , error.message);
//             return res.status(500).json({
//                 success:false,
//                 message:"Could not initaite order"
//             })
//         }

//         res.status(200).json({
//             success:true,
//             message:"Payment created successfully.",
//             courseName : CourseDetails.courseName,
//             courseDescription:CourseDetails.courseDescription,
//             price:CourseDetails.price,
//             orderId: paymentResponse.id,

//         })
//     } catch(error) {
//         console.log("Fail to create a payment" , error.message);
//         return res.status(500).json({
//             success:false,
//             message:"Fail to create a payment."
//         })
//     }
// }

// exports.verifiSignature = async (req, res) => {
//     try {
//         const webHookSecret = "ThisIsMySecretKeyForTheStudyNotionApp"
//         const signature = req.headers["x-rozorpay-signature"];

//         const shasum = crypto.createHmac("sha256" , webHookSecret)
//         shasum.update(JSON.stringify(req.body))
//         const digest = shasum.digest("hex")

//         if(signature === digest) {
//             console.log("Payment is Authorised")
//             const { courseId , userId } = req.body.payload.payment.entity.notes
            
//             try {
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                     {_id: courseId},
//                     { 
//                         $push :{
//                             studentEnrolled: userId
//                         }
//                     },
//                     { new : true }
//                 )

//                 if(!enrolledCourse) {
//                     return res.status(400).json({
//                         success:false,
//                         message:"Fail to find course"
//                     })
//                 }

//                 const enrolledUser = await User.findOneAndUpdate(
//                     {_id: userId},
//                     {
//                         $push :{
//                             courses: courseId
//                         },
//                     },
//                     { new : true }
//                 )

//                 if(!enrolledUser) {
//                     return res.status(400).json({
//                         success:false,
//                         message:"Fail to find user"
//                     })
//                 }

//                 const mailResponse = await mailSender(enrolledUser , "Baad me template daale dege" , "Baad me template daale dege")
//                 res.status(200).json({
//                     success:true,
//                     message:"Signature verified"
//                 })
//             } catch (error) {
//                 res.status(500).json({
//                     success:false,
//                     message:"Fail to enroll student in course"
//                 })
//             }
            
//         } else {
//             return res.status(400).json({
//                 success:false,
//                 message: "Invalid request"
//             })
//         }

//     } catch(error) {
//         console.log("Fail to verfiy signnature" , error.message);
//         return res.status(500).json({
//             success:false,
//             message: "Fail to verfiy signnature"
//         })
//     }
// }



// this is backend code for buying multiple items

exports.capturePayment = async (req , res) => {
    const { courses } = req.body
    const { userId } = req.user.id

    if(courses.length === 0) {
        return res.json({
            success:false,
            message: "Course id not found."
        })
    }

    let totalAmount = 0;
    for(const course_id of courses) {
        let course
        try {
            course = await Course.findById(course_id)
            if(!course) {
                return res.status(404).json({
                    success:false,
                    message: "Course not found"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId)
            if(course.studentEnrolled.includes(uid)) {
                return res.json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }
            totalAmount += course.price
        } catch(error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency:"INR",
        receipt: Math.random(Date.now()).toString()
    }

    // console.log("Options" , options)

    try {
        const paymentResponse = await instance.orders.create(options)

        res.json({
            success:true,
            data: paymentResponse
        })
    } catch(error) {
        console.log("Error while creating the order instance." , error);
        res.status(500).json({
            success:false,
            message:"Could not initiate order."
        })
    }
}

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
        return res.json({
            success:false,
            message: "Payment Failed"
        })
    }

    let body = razorpay_order_id + '|' + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256" , process.env.RAZORPAY_SECRET_ID)
        .update(body.toString())
        .digest("hex")
    
    if(expectedSignature === razorpay_signature){
        await enrolledStudent(courses , userId , res)
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }

    return res.status(500).json({
        success:false,
        message:"Payment Failed."
    })
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId , paymentId , amount } = req.body
    const userId = req.user.id

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success:false,
            message: "Please provide all the details"
        })
    }

    try {
         const enrolledStudent = await User.findById(userId) 

         await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
         )
    } catch(error) {
        console.log("Error in sending mail" , error)
        return res.status(400).json({
            success:false,
            message: "Could not send email"
        })
    }
}

const enrolledStudent = async (courses , userId , res) => {
    if(!courses || !userId) {
        return res.status(400).json({
            success:false,
            message:"Please provide course id and user id"
        })
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new : true }
            )

            if(!enrolledCourse) {
                res.status(400).json({
                    success:false,
                    mesaage:"Course not Found"
                })
            }

            const courseProgress = await CourseProgess.create({
                courseID: courseId,
                userId: userId,
                completedVideos: []
            })

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new : true }
            )

            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                  enrolledCourse.courseName,
                  `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            )
        } catch (error) {
            console.log(error)
            return res.status(400).json({ 
                success: false, error: error.message 
            })
        }
    }
}
