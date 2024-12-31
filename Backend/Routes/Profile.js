const express = require('express')
const router = express.Router()
const { auth } = require('../Middleware/auth')
const { updateProfile , deleteAccount , getAllUserDetails , updateProfilePicture } = require('../Controllers/Profile')

router.delete('/deleteProfile' , deleteAccount)
router.put('/updateProfile' , auth , updateProfile)
router.get('/getUserDetails' , auth , getAllUserDetails)
router.put('/updateProfilePicture' , auth , updateProfilePicture)

module.exports = router 