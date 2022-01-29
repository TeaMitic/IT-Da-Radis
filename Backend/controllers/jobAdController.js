const mongoose = require('mongoose')
const {JobAd} = require('../models/jobAdModel')

const CreateJobAd = async (req, res)=>{
    try{
        JobAd.create({
            companyID: req.params.companyID,
            name: req.body.name,
            description:req.body.desc,
            city: req.body.city,
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

module.exports = {
    CreateJobAd,
    DeleteJobAd
}