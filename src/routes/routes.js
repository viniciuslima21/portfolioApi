const express = require('express')
const router = express.Router()

// Multer
const multer = require('multer')
const multerConfig = require('../config/multer')
const upload = multer(multerConfig).single('img')

// Middlewares
const AdminValidation = require('../middlewares/AdminValidation')
const PortfolioValidation = require('../middlewares/PortfolioValidation')
const Verification = require('../middlewares/Verification')

// Controllers
const AdminController = require('../controller/AdminController')
const PortfolioController = require('../controller/PortfolioController')

// Admin
router.post('/admin/login', AdminController.login)
router.post('/admin', Verification.verify, AdminValidation.verifyEmailAndPass, AdminController.create)
router.get('/admin', Verification.verify, AdminController.all)
router.get('/admin/:id', Verification.verify, AdminValidation.verifyId, AdminController.show)
router.put('/admin/:id', Verification.verify, AdminValidation.verifyPass, AdminValidation.verifyId, AdminController.update)
router.delete('/admin/:id', Verification.verify, AdminValidation.verifyId, AdminController.delete)

// Portfólio
router.post('/portfolio', Verification.verify, upload, PortfolioValidation.verifyData, PortfolioController.create)
router.get('/portfolio', PortfolioController.all)
router.get('/portfolio/:id', Verification.verify, PortfolioValidation.verifyId, PortfolioController.show)
router.put('/portfolio/:id', Verification.verify, PortfolioValidation.verifyId, PortfolioController.update)
router.delete('/portfolio/:id', Verification.verify, PortfolioValidation.verifyId, PortfolioController.delete)

module.exports = router