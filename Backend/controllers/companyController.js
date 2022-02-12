const mongoose = require('mongoose')
const {Company} = require('../models/companyModel');
const {JobAd} = require('../models/jobAdModel');
const {JobUserRel} = require('../models/jobUserRelModel');
const jwt = require('../token')
const bcrypt = require('bcrypt')
const multer = require('multer')  
var fs = require('fs');
var path = require('path');
// require('dotenv/config');


// const storage= multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb)=>{
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage }); //????

const UploadImage = async(req, res) => {
    try{
        // const filepath= "E:\\Users\\Pictures\\stickers" 
        // upload.single('image')
        await Company.findById(req.params.id).then(result=>{

            console.log(req.files.image)
            const obj={
                name: req.files.image.name,
                img:{
                    data: req.files.image.data,
                    // data: fs.readFileSync(path.join(filepath + '\\' + req.files.image.name)),
                    contentType: req.files.image.mimetype
                }
            }
            result.image = obj
            result.save().then(()=>{
                res.status(200).send(req.body)
            })

        })

    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const CreateCompany = async (req, res)=>{
    

    bcrypt.hash(req.body.password, 10).then(async hash => {
        const company = await Company.create({
            username: req.body.username,
            password: hash,
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

    }
    ).catch(err => res.status(500).send(err.message))
}

const UpdatePassword = async (req,res) => { 
    try {
        let company = await Company.findById(req.params.id)
        if (company) {          
            
            let hash = await bcrypt.hash(req.body.newPassword, 10)
            company.password = hash
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

const GetCompaniesByIndex = async (req, res) =>{
    try{
        let reslist = await Company.aggregate([
            {
                "$search":{
                    "index":"trazenje",
                    "text":{
                        "query":req.body.trazeniTag,
                        "path":["categories","name"]
                    }
                }
            }
        ])
        res.status(200).send(reslist)
    }
    catch(err){
        res.status(500).send(err.message)
        console.log(err)
    }
}

const GetAllCategories = async (req, res)=>{
    try{
        let resList = []
        let newEl = {}
        let listOfCat = await Company.distinct("categories")
        for await (el of listOfCat){
            newEl ={}
            newEl.nameOfCat = el
            newEl.numOfComp = await Company.count({categories: { $elemMatch:{ $eq: el} }})
            resList.push(newEl)
        }
        res.status(200).send(resList)
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
            // result.password= company.password
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
const UpdateCategories = async(req, res)=>{
    try{
        await Company.findById(req.params.id).then(result=>{
            result.categories= req.body.categories
            result.save().then(()=>{
                res.status(200).send('Uspesno izmenjeno')
            })
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

const DeleteCompany = async (req, res)=>{
    try{
        const companyID = req.params.id
        let jobAds = await JobAd.find({companyID})
        for await (let ad of jobAds){
            await JobUserRel.deleteMany({jobID:ad._id})
        }
        await JobAd.deleteMany({companyID})
        await Company.deleteOne({_id:companyID}).then(()=>{
            res.status(200).send('Uspesno izbrisano')
        }).catch((err)=>{
            res.status(404).send('Kompanija nije pronadjena')
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
    UpdateCategories,
    GetCompaniesByIndex,
    GetAllCategories,
    UploadImage,
    DeleteCompany
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