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

module.exports={
    CreateJobApplication,
    DeleteJobApplication
}