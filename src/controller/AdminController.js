const AdminModel = require('../model/AdminModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretToken = require('../config/auth.json')

class AdminController {

    async login(req, res) {
        const { email, password } = req.body

        const admin = await AdminModel.findOne({'email': { '$eq': email }})

        if (!admin)
            return res.status(404).json({ error: 'E-mail não encontrado!' })

        if (await bcryptjs.compare(password, admin.password)) {

            const [ idAdmin, emailAdmin ] = [ admin._id, admin.email ]

            const token = jwt.sign(
                { idAdmin, emailAdmin }, 
                secretToken.secret, 
                { expiresIn: secretToken.expiresIn }
            )

            return res.status(200).json({ token })
        } else {
            return res.status(400).json({ error: 'Senha incorreta!' })
        }
    }

    async create(req, res) {
        // Gerar senha com hash
        let salt = bcryptjs.genSaltSync()
        req.body.password = bcryptjs.hashSync(req.body.password, salt)

        let admin = new AdminModel(req.body)

        await admin 
            .save()
            .then(response => {
                response.password = undefined

                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async all(req, res) {
        await AdminModel
            .find()
            .then(response => {
                response.map(data => {
                    data.password = undefined
                })

                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async show(req, res) {
        await AdminModel
            .findById(req.params.id)
            .then(response => {
                if (response) {
                    response.password = undefined
                    
                    return res.status(200).json(response);
                } else
                    return res.status(404).json({ error: 'Admin não encontrado!' });
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async update(req, res) {
        if (req.body.password) {
            let salt = bcryptjs.genSaltSync()
            req.body.password = bcryptjs.hashSync(req.body.password, salt)
        }

        await AdminModel
            .findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                response.password = undefined

                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        await AdminModel
            .deleteOne({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new AdminController()