const mongoose = require('mongoose')
const {JobAd} = require('../models/jobAdModel')

const CreateJobAd = async (req, res)=>{
    try{
        JobAd.create({
            companyID: req.params.companyID,
            name: req.body.name,
            description:req.body.desc,
            city: req.body.city,
            salary:req.body.salary,
            tags: req.body.tags,
            expireAt:new Date(req.body.expireAt)
        }).then(jobAd=>{
            res.status(200).send(jobAd)
        }).catch(err=>{
            console.log(err)
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const DeleteJobAd = async (req, res)=>{
    const id = req.params.jobAdID
    JobAd.deleteOne({ _id: id })
    .then(()=>{
        res.status(200).send("proba: sve okej")
    })
    .catch(err=>{
        console.log(err.message)
        res.status(500).send(err.message)
    })
}

const GetAllJobAds = async (req, res)=>{
    try{
        let date = new Date(Date.now())
        let allJobAds = await JobAd.find({expireAt:{$gte:date}})
        res.status(200).send(allJobAds)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const GetCompaniesJobAds = async (req, res)=>{
    try{
        const companyID = req.params.companyID
        let companiesJobAds = await JobAd.find({ companyID })
        res.status(200).send(companiesJobAds)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const GetCompaniesActiveJobAds = async (req, res)=>{
    try{
        const compID = req.params.companyID
        let date = new Date(Date.now())
        console.log(date)
        let companiesJobAds = await JobAd.find({companyID: compID, expireAt:{$gte:date}})
        res.status(200).send(companiesJobAds)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const GetJobAdByID = async (req, res)=>{
    try{
        const jobAdID = req.params.jobAdID
        let jobAd = await JobAd.findOne({ _id: jobAdID })
        res.status(200).send(jobAd)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const UpdateJobAd = async (req, res)=>{
    try{
        const jobAdID = req.params.jobAdID
        let jobAd = await JobAd.findOne({ _id: jobAdID })
        jobAd.name = req.body.name
        jobAd.description = req.body.desc
        jobAd.city = req.body.city
        jobAd.salary = req.body.salary
        jobAd.expireAt = new Date(req.body.expireAt)
        jobAd.save().then((result)=>{
            res.status(200).send(result)
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const AddTagToJobAd = async (req, res)=>{
    try{
        const jobAdID = req.params.jobAdID
        let jobAd = await JobAd.findOne({ _id: jobAdID })
        if(jobAd.tags.includes(req.body.newTag)){
            res.status(400).send('Vec postoji trazeni tag za ovaj oglas')
        }
        else{
            jobAd.tags.push(req.body.newTag)
            jobAd.save().then((result)=>{
                res.status(200).send(result)
            })
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const DeleteTagToJobAd = async (req, res)=>{
    try{
        const jobAdID = req.params.jobAdID
        let jobAd = await JobAd.findOne({ _id: jobAdID })
        if(!jobAd.tags.includes(req.body.tag)){
            res.status(400).send('Ne postoji trazeni tag za ovaj oglas')
        }
        else{
            jobAd.tags = jobAd.tags.filter(function(value){ 
                 return value !== req.body.tag;
            });
            jobAd.save().then((result)=>{
                res.status(200).send(result)
            })
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports = {
    CreateJobAd,
    DeleteJobAd,
    GetAllJobAds,
    GetCompaniesJobAds,
    GetJobAdByID,
    UpdateJobAd,
    AddTagToJobAd,
    DeleteTagToJobAd,
    GetCompaniesActiveJobAds
}