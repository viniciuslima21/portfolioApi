const multer = require('multer')
const { extname, resolve } = require('path')

const random = Math.floor(Math.random() * 10000 + 10000)

const configMulter = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'imagem/jpg' && file.mimetype !== 'image/jpeg')
            return cb(new multer.MulterError('O arquivo precisa ser PNG, JPG ou JPEG!'))

        return cb(null, true)
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${random}${extname(file.originalname)}`)
        }
    })
}

module.exports = configMulter