const express = require('express');
//const jobUserRelController = require('../controllers/jobUserRelController');

const router = express.Router();

const {
    CreateJobApplication,
    DeleteJobApplication,
    GetUsersJobAds,
    GetCandidatesForJobAd,
    UploadCV,
    NumOfCandidates
} = require('../controllers/jobUserRelController');

router.post('/createJobApplication',CreateJobApplication)
router.delete('/deleteJobApplication/:id', DeleteJobApplication)
router.get('/getUsersJobAds/:id', GetUsersJobAds)
router.get('/getCandidates/:id', GetCandidatesForJobAd)
router.put('/uploadCV/:id', UploadCV)
router.get('/numOfCandidates/:id', NumOfCandidates)

module.exports = router