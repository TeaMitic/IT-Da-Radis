const express = require('express');
//const jobUserRelController = require('../controllers/jobUserRelController');

const router = express.Router();

const {
    CreateJobApplication,
    DeleteJobApplication,
    UploadCV
} = require('../controllers/jobUserRelController');

router.post('/createJobApplication',CreateJobApplication)
router.delete('/deleteJobApplication/:id', DeleteJobApplication)
router.put('/uploadCV/:id', UploadCV)

module.exports = router