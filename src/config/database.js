const mongoose = require('mongoose')

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/portfolio'
mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log(err)

        console.log("Database connected!")
        console.log("Mongo URL: " + process.env.MONGO_URL)
    }
)

module.exports = mongoose
