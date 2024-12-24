const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL

async function ConnectDB() {
    try {
        await mongoose.connect(DATABASE_URL)
        console.log("DB connection successful.")

    } catch(error) {
        console.log(error);
        console.log("Fail to connect with DB.")
    }
}

module.exports = ConnectDB