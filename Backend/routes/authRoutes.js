const express = require('express');
const router = express.Router();

const { CreateUser, LoginUser } = require('../controllers/userController')
const { CreateCompany, LoginCompany } = require('../controllers/companyController')

router.post('/registerUser', CreateUser)
router.post('/registerCompany', CreateCompany)
router.post('/loginUser', LoginUser)
router.post('/loginCompany', LoginCompany)

module.exports = router