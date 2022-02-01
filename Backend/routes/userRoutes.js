const express = require('express');
//const userController = require('../controllers/userController');

const router = express.Router();

const{
    GetUserByID,
    UpdateUser
} =  require('../controllers/userController');

router.get('/getUser/:id',GetUserByID)
router.put('/updateUser/:id', UpdateUser)

module.exports = router