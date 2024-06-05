const mongoose = require('mongoose');
let dtabaseConnection = () => {
    mongoose.connect(process.env.MONGO_URL).then((conn) => {
        console.log(`your are connected to database on ${conn.connection.host}`)
    }).catch((err) => {
        console.log(`you have an error on connection to database ${err}`)
    })
}

module.exports = dtabaseConnection