const mongoose = require('mongoose');
let dtabaseConnection = async () => {

    mongoose.set("strictQuery", true)
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log(`DataBase connect on ${connect.connection.host} `)

}

module.exports = dtabaseConnection()