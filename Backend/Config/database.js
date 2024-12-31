const mongoose = require('mongoose');
require('dotenv').config()
const URL = process.env.DATABASE_URL

async function ConnectDB() {
    try {
        await mongoose.connect(URL)
        console.log("DB connection successful.")
    } catch(error) {
        console.log(error.message);
        console.log("Fail to connect with DB.")
    }
}

module.exports = ConnectDB