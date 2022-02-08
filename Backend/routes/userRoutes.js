const express = require('express');
//const userController = require('../controllers/userController');

const router = express.Router();

const{
    GetUserByID,
    UpdateUser,
    UpdatePassword,
    DeleteUser
} =  require('../controllers/userController');

router.get('/getUser/:id',GetUserByID)
router.put('/changePassword/:id',UpdatePassword)
router.put('/updateUser/:id', UpdateUser)
router.delete('/deleteUser/:id', DeleteUser)

module.exports = router