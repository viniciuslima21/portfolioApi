const mongoose = require('../config/database')
const Schema = mongoose.Schema

const PortfolioSchema = new Schema({
    title: { type: String, required: true },
    type: { type: Number, required: true },
    img: { type: String, required: true },
    githubLink: { type: String, required: false },
    created: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Portfolio', PortfolioSchema)