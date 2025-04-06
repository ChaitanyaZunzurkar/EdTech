const express = require('express')
const router = express.Router()
const { auth , isInstructor } = require('../Middleware/auth')
const { updateProfile , deleteAccount , getAllUserDetails , updateProfilePicture ,getEnrolledCourses ,instructorDashboard } = require('../Controllers/Profile')

router.delete('/deleteProfile' , deleteAccount)
router.put('/updateProfile' , auth , updateProfile)
router.get('/getUserDetails' , auth , getAllUserDetails)
router.put('/updateProfilePicture' , auth , updateProfilePicture)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router 