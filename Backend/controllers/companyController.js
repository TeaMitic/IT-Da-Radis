const mongoose = require('mongoose')
const {Company} = require('../models/companyModel');
const jwt = require('../token')
const bcrypt = require('bcrypt')

const CreateCompany = async (req, res)=>{
    try{
        const company = await Company.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            description: req.body.desc,
            address:req.body.address,
            website: req.body.website,
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
const UpdatePassword = async (req,res) => { 
    try {
        let company = await Company.findById(req.params.id)
        if (company) { 
            let newPassword = req.body.newPassword
            company.password = newPassword
            await company.save()
            res.status(200).send("Uspesno promenjena sifra!")
        }
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

const LoginCompany = async (req, res) =>{
    try{
        const {username, password} = req.body
        const company = await Company.findOne({ username });
        if(company){
            const auth = await bcrypt.compare(password, company.password);
            if (auth){
                let token = jwt.createToken(company._id)
                let sendInfo = {
                    id: company._id,
                    username: company.username, 
                    token:token,
                    tip:'C'
                }
                res.status(200).send(sendInfo)
            }
            else{
                res.status(401).send('Pogresna sifra!')
            }
        }
        else{
            res.status(404).send('Kompanija sa tim username-om ne postoji!')
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

//get api
const GetAllCompanies = async (req, res) =>{
    try{
        await Company.find().limit(req.params.limit).then( result =>{
            res.status(200).send(result)
        })
            

    }
    catch(err){
        res.status(500).send(err.message)
    }
}
const GetCompanyByID = async (req, res) =>{
    try{
        const id= req.params.id
        await Company.findById(id).then( result =>{
            res.status(200).send(result)
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
const GetCategories = async (req,res) => {
    try{
        await Company.findById(req.params.id).then(result=>{
            res.status(200).send(result.categories)
        })

    }
    catch(err){
        res.status(500).send(err.message)
    }
}

//update company
const UpdateCompany = async (req, res)=>{
    try{
        await Company.findById(req.params.id).then(result=>{
            const company = req.body
            result.username = company.username
            result.password= company.password
            result.name= company.name
            result.description=company.description
            result.address= company.address
            result.email= company.email
            result.website= company.website
            //result.categories = company.categories - ima posebna fja za to, da se doda 
            result.socialMedia.instagramLink = company.socialMedia.instagramLink
            result.socialMedia.facebookLink= company.socialMedia.facebookLink
            result.socialMedia.twitterLink=company.socialMedia.twitterLink

            result.save().then(()=>{
                res.status(200).send('Uspesno izmenjeno')
            })
        })
       
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const AddCategory = async (req, res) => {
    try{
        await Company.findById(req.params.id).then(result=>{
            const found = result.categories.includes(req.body.name)
            if(!found){
                result.categories.push(req.body.name)
                result.save().then(()=>{
                    res.status(200).send('Uspesno izmenjeno')
                })
            }
            else{
                res.status(400).send('Vec postoji kategorija sa ovim nazivom')
            }
        })

    }
    catch(err){
        res.status(500).send(err.message)
    }
}

//delete api
const DeleteCategory = async (req, res)=>{
    try{
        await Company.findById(req.params.id).then(result=>{
            result.categories = result.categories.filter((value)=>{
                return value != req.body.name
            })
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
    CreateCompany,
    LoginCompany,
    GetAllCompanies,
    GetCompanyByID, 
    UpdateCompany,
    AddCategory,
    GetCategories,
    DeleteCategory,
    UpdatePassword,
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