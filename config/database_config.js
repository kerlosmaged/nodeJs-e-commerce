const mongoose = require('mongoose');
let dtabaseConnection = async () => {
    try {
        mongoose.set("strictQuery", true)
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`DataBase connect on ${connect.connection.host} `)
    } catch (error) {
        console.log(`DataBase Have an Error and this is error message -> ${error}`)
    }
}

module.exports = dtabaseConnection()