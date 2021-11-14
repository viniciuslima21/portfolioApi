const express = require('express')
const cors = require('cors')

const app = express()
app.use('/images', express.static('src/uploads'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const routes = require('./routes/routes')
app.use('/', routes)

app.listen(3333, () => {
    console.log('API Online!')
})