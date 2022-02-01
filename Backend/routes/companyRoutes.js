const express = require('express');
//const companyController = require('../controllers/companyController');

const router = express.Router();

const{
    GetAllCompanies,
    GetCompanyByID,
    UpdateCompany,
    AddCategory,
    GetCategories,
    DeleteCategory
} = require('../controllers/companyController');

router.get('/getAllCompanies', GetAllCompanies)
router.get('/getCompany/:id', GetCompanyByID)
router.get('/getCategories/:id', GetCategories)
router.put('/updateCompany/:id', UpdateCompany)
router.put('/addCategory/:id', AddCategory)
router.put('/deleteCategory/:id', DeleteCategory)


module.exports = router