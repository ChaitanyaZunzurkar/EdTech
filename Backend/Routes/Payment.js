const express = require('express')
const router = express.Router()
const { auth , isAdmin , isInstructor , isStudent } = require('../Middleware/auth')
const { createPayment , verifiSignature ,  } = require('../Controllers/Payment')

router.post('/createPayment' , auth , isStudent , createPayment)
router.post('/verifySignature' , verifiSignature)

module.exports = router 