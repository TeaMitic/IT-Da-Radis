const express = require('express');

const router = express.Router();

const{
    GetAllCompanies,
    GetCompanyByID,
    UpdateCompany,
    AddCategory,
    GetCategories,
    DeleteCategory,
    UpdatePassword,
    UpdateCategories,
    GetCompaniesByIndex,
    GetAllCategories,
    UploadImage,
    DeleteCompany
} = require('../controllers/companyController');

router.get('/getAllCompanies/:limit', GetAllCompanies)
router.get('/getCompany/:id', GetCompanyByID)
router.get('/getCategories/:id', GetCategories)
router.put('/updateCompany/:id', UpdateCompany)
router.put('/addCategory/:id', AddCategory)
router.put('/deleteCategory/:id', DeleteCategory)
router.put('/changePassword/:id', UpdatePassword)
router.put('/updateCategories/:id', UpdateCategories)
router.put('/getCompaniesByIndex', GetCompaniesByIndex)
router.get('/getAllCategories', GetAllCategories)
router.put('/uploadImage/:id', UploadImage)
router.delete('/deleteCompany/:id', DeleteCompany)


module.exports = router