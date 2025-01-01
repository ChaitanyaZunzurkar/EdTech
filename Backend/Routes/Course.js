const express = require('express')
const router = express.Router()
const { auth , isAdmin , isStudent , isInstructor } = require('../Middleware/auth')
const { createSection , updatedSection , deleteSection } =require('../Controllers/Section')
const { createSubSection , updateSubSection , deleteSubSection } = require("../Controllers/Subsection")
const { creatingRatingAndReviews , getAvgCourseRating , getAllRatingAndReviews } = require('../Controllers/ratingAndReviews')
const { createCategory , showAllCategory , CategoryPageDetails } = require('../Controllers/Categories')
const { createCourse, getAllCourses , getCourseDetails } = require('../Controllers/Course')

router.post('/createCategory' , auth , isAdmin , createCategory)
router.get('/getCategory' , showAllCategory)
router.post('/categoryPageDetails' , CategoryPageDetails)

router.post('/creatingRatingAndReviews' , auth , isStudent , creatingRatingAndReviews)
router.get('/getAvgCourseRating' , getAvgCourseRating)
router.get('/getAllRatingAndReviews' , getAllRatingAndReviews)

router.post('/create-section' , auth , isInstructor , createSection)
router.put('/update-section' , updatedSection)
router.delete('/delete-section' , deleteSection)

router.post('/create-subsection' , auth , isInstructor , createSubSection)
router.put('/update-subsection' , updateSubSection)
router.delete('/delete-subsection' , deleteSubSection)

router.post('/create-course' , auth , isInstructor ,  createCourse)
router.get('/getCourse' , getAllCourses)
router.get('/getCourseDetials' , getCourseDetails)

module.exports = router 