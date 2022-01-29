const mongoose = require('mongoose')
const {User} = require('../models/userModel');
const jwt = require('../token')

const CreateUser = async (req, res)=>{
    try{
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            surname:req.body.surname,
            email:req.body.email
        })
        let token = jwt.createToken(user._id)
        let sendInfo ={
            id: user._id,
            username: user.username,
            token: token,
            tip:'U'
        }
        res.status(200).send(sendInfo)
        console.log(sendInfo)
    }catch(err){
        res.status(500).send(err.message)
    }
}

module.exports = {
    CreateUser
}