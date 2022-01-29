const express = require('express');
const router = express.Router();

const { CreateUser } = require('../controllers/userController')
const { CreateCompany } = require('../controllers/companyController')

router.post('/registerUser', CreateUser)
router.post('/registerCompany', CreateCompany)

// router.post('loginUser',(req, res)=>{

// })

module.exports = router