const express = require('express')
const router = express.Router()
const { auth } = require('../Middleware/auth')
const { otpSender , signUp , signin , changePassword } = require('../Controllers/Auth')
const { resetPasswordToken , resetPassword } = require('../Controllers/ResetPassword')

router.post('/signin' , signin)
router.post('/signup' , signUp)
router.post('/reset-password-token' , resetPasswordToken)
router.post('/reset-password' , resetPassword)
router.post('/sendotp' , otpSender)
router.post('/changePassword' , auth , changePassword)

module.exports = router 