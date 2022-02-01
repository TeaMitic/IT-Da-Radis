const mongoose = require('mongoose')
const {User} = require('../models/userModel');
const jwt = require('../token')
const bcrypt = require('bcrypt')

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

const LoginUser = async (req, res) =>{
    try{
        const {username, password} = req.body
        const user = await User.findOne({ username });
        if(user){
            const auth = await bcrypt.compare(password, user.password);
            if (auth){
                let token = jwt.createToken(user._id)
                let sendInfo = {
                    id: user._id,
                    username: user.username, 
                    token:token,
                    tip:'U'
                }
                res.status(200).send(sendInfo)
            }
            else{
                res.status(401).send('Pogresna sifra!')
            }
        }
        else{
            res.status(404).send('Korisnik sa tim username-om ne postoji!')
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const GetUserByID= async (req, res)=>{
    try{
        await User.findById(req.params.id).then(result =>{
            res.status(200).send(result)
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
const UpdateUser = async (req, res)=>{
    try{
        await User.findById(req.params.id).then(result=>{
            const user = req.body
            result.username= user.username
            result.password= user.password
            result.name= user.name
            result.surname= user.surname
            result.email= user.email

            result.save().then(()=>{
                res.status(200).send('Uspesno izmenjeno')
            })
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}


module.exports = {
    CreateUser,
    LoginUser,
    GetUserByID,
    UpdateUser
}