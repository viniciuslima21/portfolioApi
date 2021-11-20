const jwt = require('jsonwebtoken')

class Verification {
    verify (req, res, next) {
        const { authorization } = req.headers

        if (!authorization)
            return res.status(401).json({ error: 'Você precisa estar logado para acessar essa página!' })

        try {      
            const [, token] = authorization.split(' ')
            
            const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

            const { id, email } = data
            req.idAdmin = id
            req.emailAdmin = email

            next()
        } catch(e) {
            return res.status(500).json({ error: 'Acesso não autorizado!'})
        }
    }
}

module.exports = new Verification