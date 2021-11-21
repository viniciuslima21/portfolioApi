const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const routes = require('./routes/routes')
app.use('/', routes)
app.use('/images', express.static('src/uploads'))

app.listen(process.env.PORT || 3333, () => {
    console.log('API Online!')
})