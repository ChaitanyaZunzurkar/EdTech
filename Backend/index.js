const express = require('express')
const ConnectDB = require('./Config/database')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

ConnectDB()

app.listen(PORT  , () => {
    console.log(`Server started at ${PORT}`)
})