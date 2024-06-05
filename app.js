// app configration and require modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: "config/config.env" })
const app = express()

// require files in your application 
const mongoConnection = require('./config/database_config');
const categoryRoutes = require('./routes/category_route')

// database connection
mongoConnection()


// middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
    console.log("we used morgan dev and on development")
}

// using routes 

app.use('/api/v1/category',categoryRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`app listen on ${port} and run in ${process.env.NODE_ENV} environment`)
})

