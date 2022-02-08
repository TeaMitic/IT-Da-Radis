const mongoose = require('mongoose')
const {JobUserRel} = require('../models/jobUserRelModel');
const {JobAd} = require('../models/jobAdModel')

const CreateJobApplication= async (req,res)=>{
    try{
        const jobApplication= await JobUserRel.create({
            jobID: req.body.jobID,
            userID: req.body.userID,
            cv: req.body.cv,
            userEmail: req.body.userEmail,
            userTel: req.body.userTel
        })
        res.status(200).send('Uspesno napravljeno')
        // console.log(jobApplication)
    }
    catch(err){
        res.status(500).send(err.message)
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
        res.status(500).send(err.message)
    }
}

const GetUsersJobAds = async (req, res)=>{
    try{
        const id = req.params.id
        let usersJobAds = await JobUserRel.find({ userID: id })
        let resultList = []
        let newElement = {}
        for await (let el of usersJobAds){
            newElement._id = el._id
            newElement.userEmail = el.userEmail
            newElement.userTel = el.userTel
            let jobad = await JobAd.findById(el.jobID)
            newElement.jobAdInfo = jobad
            console.log(newElement)
            resultList.push(newElement)
        }
        res.status(200).send(resultList)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports={
    CreateJobApplication,
    DeleteJobApplication,
    GetUsersJobAds
}