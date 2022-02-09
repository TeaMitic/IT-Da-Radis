const express = require('express');

const router = express.Router();

const { CreateJobAd,
        DeleteJobAd,
        GetAllJobAds,
        GetCompaniesJobAds,
        GetJobAdByID,
        UpdateJobAd,
        AddTagToJobAd,
        DeleteTagToJobAd,
        UpdateTagsToJobAd,
        GetCompaniesActiveJobAds} = require('../controllers/jobAdController')

router.post('/createJobAd/:companyID', CreateJobAd)
router.delete('/deleteJobAd/:jobAdID', DeleteJobAd)
router.get('/getAllJobAds', GetAllJobAds)
router.get('/getCompaniesJobAds/:companyID', GetCompaniesJobAds)
router.get('/getJobAdByID/:jobAdID', GetJobAdByID)
router.put('/updateJobAd/:jobAdID', UpdateJobAd)
router.put('/addTag/:jobAdID', AddTagToJobAd)
router.put('/deleteTag/:jobAdID', DeleteTagToJobAd)
router.get('/getCompaniesActiveJobAds/:companyID', GetCompaniesActiveJobAds)
router.put('/updateTags/:id', UpdateTagsToJobAd)

module.exports = router