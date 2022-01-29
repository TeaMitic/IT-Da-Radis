const express = require('express');

const router = express.Router();

const { CreateJobAd, DeleteJobAd } = require('../controllers/jobAdController')

router.post('/createJobAd/:companyID', CreateJobAd)
router.delete('/deleteJobAd/:jobAdID', DeleteJobAd)

module.exports = router