const express = require('express');
//const userController = require('../controllers/userController');

const router = express.Router();

const{
    GetUserByID,
    UpdateUser,
    UpdatePassword
} =  require('../controllers/userController');

router.get('/getUser/:id',GetUserByID)
router.put('/changePassword/:id',UpdatePassword)
router.put('/updateUser/:id', UpdateUser)

module.exports = router