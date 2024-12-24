const nodemailer = require('nodemailer')
require('dotenv').config()

const mailSender = async (email , title , body) => {
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                password: process.env.PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from:'StudyNOtion',
            to: `${email}`,
            subject:`${title}`,
            html:`${body}`
        })

    } catch(error) {
        console.log("Fail to send OTP through mail")
        console.log(error)
    }
}

module.exports = mailSender;