const mongoose = require('mongoose')
const {JobUserRel} = require('../models/jobUserRelModel');
const {JobAd} = require('../models/jobAdModel')

const CreateJobApplication= async (req,res)=>{
    try{
        const jobApplication= await JobUserRel.create({
            jobID: req.body.jobID,
            userID: req.body.userID,
            // cv: req.body.cv,
            name:req.body.name,
            surname:req.body.surname,
            userEmail: req.body.userEmail,
            userTel: req.body.userTel
        })
        res.status(200).send({jobRelID: jobApplication._id})
        // console.log(jobApplication)
    }
    catch(err){
        res.status(500).send(err.message)
        console.log( err.message);
    }
}
const DeleteJobApplication = async (req, res)=>{
    try{
        const id = req.params.id
        await JobUserRel.deleteOne({ _id: id })
        .then(()=>{
            res.status(200).send("Uspesno izbrisano")
        })                         
    }
    catch(err){
        res.status(500).send({message: err.message})
    }
}

const GetUsersJobAds = async (req, res)=>{
    try{
        const id = req.params.id
        let usersJobAds = await JobUserRel.find({ userID: id })
        let resultList = []
        for await (let el of usersJobAds){
            let newElement = {}
            newElement._id = el._id
            newElement.userEmail = el.userEmail
            newElement.userTel = el.userTel
            newElement.name = el.name
            newElement.surname = el.surname
            newElement.cv = el.cv
            let jobad = await JobAd.findById(el.jobID)
            newElement.jobAdInfo = jobad
            // console.log(newElement)
            resultList.push(newElement)
        }
        res.status(200).send(resultList)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
const GetCandidatesForJobAd= async (req,res)=>{
    try{
        let candidates = await JobUserRel.find({jobID: req.params.id})

        res.status(200).send(candidates)    

    }
    catch(err){
        res.status(500).send(err.message)
    }
}
const UploadCV =async(req,res)=>{
    try{
        await JobUserRel.findById(req.params.id).then(result=>{
            console.log(req.files.my_file);
            console.log(req.files.my_file.data);
            const obj={
                name: req.files.my_file.name,
                contentType: req.files.my_file.mimetype,
                data: req.files.my_file.data,
            }
            result.cv= obj
            result.save().then(()=>{
                res.status(200).send('Upseno dodato')
            })
        })

    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports={
    CreateJobApplication,
    DeleteJobApplication,
    GetUsersJobAds,
    GetCandidatesForJobAd,
    UploadCV
}