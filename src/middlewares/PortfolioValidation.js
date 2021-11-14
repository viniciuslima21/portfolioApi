const PortfolioModel = require('../model/PortfolioModel')

class PortfolioValidation {
    async verifyData(req, res, next) {
        const { title, type } = req.body
        const file = req.file.filename

        if (!title)
            return res.status(400).json({ error: 'O título é obrigatório!' })
        else if (!type)
            return res.status(400).json({ error: 'O tipo é obrigatório!' })
        else if (!file)
            return res.status(400).json({ error: 'A imagem é obrigatória!' })
        else
            next()
    }

    async verifyId(req, res, next) {
        const id = req.params.id

        let exists = await PortfolioModel.findOne({
            '_id': { '$eq': id }
        })

        if (!exists)
            return res.status(400).json({ error: 'Esse projeto não existe!' })
        next()
    }
}

module.exports = new PortfolioValidation