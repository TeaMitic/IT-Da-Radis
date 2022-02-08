const express = require('express');
//const jobUserRelController = require('../controllers/jobUserRelController');

const router = express.Router();

const {
    CreateJobApplication,
    DeleteJobApplication,
    GetUsersJobAds
} = require('../controllers/jobUserRelController');

router.post('/createJobApplication',CreateJobApplication)
router.delete('/deleteJobApplication/:id', DeleteJobApplication)
router.get('/getUsersJobAds/:id', GetUsersJobAds)

module.exports = router