const express = require('express')
const ConnectDB = require('./Config/database')
const connectWithCloudinary = require('./Config/cloudinary')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require('./Routes/User')
const paymentRoutes = require('./Routes/Payment')
const profileRoutes = require('./Routes/Profile')
const courseRoutes = require('./Routes/Course')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:5173', 'https://study-notion-xi-eight.vercel.app'],
    credentials:true
}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

app.use('/api/v1/auth' , userRoutes)
app.use('/api/v1/payment' , paymentRoutes)
app.use('/api/v1/profile' , profileRoutes)
app.use('/api/v1/course' , courseRoutes)

ConnectDB()
connectWithCloudinary()

app.listen(PORT  , () => {
    console.log(`Server started at ${PORT}`)
})