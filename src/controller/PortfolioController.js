const PortfolioModel = require('../model/PortfolioModel')
const fs = require('fs')

class PortfolioController {
    
    async create(req, res) {
        let bodyWithImg = req.body
        bodyWithImg = {...bodyWithImg, "img": `${req.file.filename}` }

        const portfolio = new PortfolioModel(bodyWithImg)

        await portfolio
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async all(req, res) {
        await PortfolioModel
            .find()
            .sort('type')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
    
    async show(req, res) {
        await PortfolioModel
            .findById(req.params.id)
            .then(response => {
                if (response) 
                    return res.status(200).json(response)
                else
                    return res.status(404).json({ error: 'Portfólio não encontrado!' })
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        await PortfolioModel
            .findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        const img = await PortfolioModel.findById(req.params.id).then(response => response.img)
        
        await PortfolioModel
            .deleteOne({ '_id': req.params.id })
            .then(response => {
                fs.unlink('./src/uploads/' + img, err => err && console.log(err))

                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    } 
}

module.exports = new PortfolioController