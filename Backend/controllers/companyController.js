const mongoose = require('mongoose')
const {Company} = require('../models/companyModel');
const jwt = require('../token')

const CreateCompany = async (req, res)=>{
    try{
        const company = await Company.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            description: req.body.desc,
            address:req.body.address,
            contactTel: req.body.contactTel,
            email: req.body.email,
            socialMedia:{
                instagramLink: req.body.igLink,
                facebookLink: req.body.fbLink,
                linkedInLink: req.body.liLink,
                twitterLink: req.body.twLink
            }
        })
        let token = jwt.createToken(company._id)
        let sendInfo ={
            id: company._id,
            username: company.username,
            token: token,
            tip:'C'
        }
        res.status(200).send(sendInfo)
        console.log(sendInfo)
    }catch(err){
        res.status(500).send(err.message)
    }
}

module.exports = {
    CreateCompany
}

//1. opcija
// {
//     username: req.body.username,
//     password: req.body.password,
//     name: req.body.name,
//     description: req.body.desc,
//     address:req.body.address,
//     contactTel: req.body.contactTel,
//     email: req.body.email,
//     socialMedia:{
//         instagramLink: req.body.igLink,
//         facebookLink: req.body.fbLink,
//         linkedInLink: req.body.liLink,
//         twitterLink: req.body.twLink
//     }
// }

//2. opcija
//create(req.body)