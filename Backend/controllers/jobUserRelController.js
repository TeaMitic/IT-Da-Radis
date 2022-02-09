const mongoose = require('mongoose')
const {JobUserRel} = require('../models/jobUserRelModel');

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
const UploadCV =async(req,res)=>{
    try{
        await JobUserRel.findById(req.params.id).then(result=>{
            const obj={
                data: req.files.cv.data,
                contentType: 'application/msword'
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
    UploadCV
}