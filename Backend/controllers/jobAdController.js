const mongoose = require('mongoose')
const {JobAd} = require('../models/jobAdModel')
const {JobUserRel} = require('../models/jobUserRelModel')

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
    try{
        const id = req.params.jobAdID
        const count = await JobUserRel.deleteMany({jobID:id})
        JobAd.deleteOne({ _id: id })
        .then(()=>{
            res.status(200).send("proba: sve okej")
        }).catch((err)=>{
            res.status(404).send('Oglas nije pronadjen')
        })
    }
    catch(err){
        console.log(err.message)
        res.status(500).send(err.message)
    }
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
//1. NACIN - koristeci distinct i count

// const GetAllTags = async (req, res)=>{
//     try{
//         let resList = []
//         let newEl = {}
//         let listOfTags = await JobAd.distinct("tags")
//         for await (el of listOfTags){
//             newEl ={}
//             newEl.tag = el
//             newEl.num = await JobAd.count({tags: { $elemMatch:{ $eq: el} }})
//             resList.push(newEl)
//         }
//         res.status(200).send(resList)
//     }
//     catch(err){
//         res.status(500).send(err.message)
//     }
// }


//2. nacin - koristeci aggregate (nemam pojma kako ovo radi, provalicu ga u petak)
//https://stackoverflow.com/questions/21509045/mongodb-group-by-array-inner-elements

const GetAllTags = async (req, res)=>{
    try{
        let resList = await JobAd.aggregate([
            {$project: { _id: 0, tags: 1 } },
            {$unwind: "$tags" },
            {$group: { _id: "$tags", num: { $sum: 1 } }},
            {$project: { _id: 0,tag: "$_id", num: 1 } },
            {$sort: { num: -1 } }
          ])

        res.status(200).send(resList)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}


//1. NACIN

// const GetFilteredJobAds = async (req, res)=>{
//     try{
//         let date = new Date(Date.now())
//         let reslist = await JobAd.aggregate([
//             {
//                 "$search":{
//                     "index":"trazenjeOglasa",
//                     "text":{
//                         "query":req.body.trazeniTag,
//                         "path":["tags","name","city"]
//                     }
//                 }
//             }
//         ])
//         // console.log(reslist)
//         reslist = reslist.filter((el)=>{
//             return el.expireAt.getTime() > date.getTime()
//         })
//         res.status(200).send(reslist)
//     }
//     catch(err){
//         res.status(500).send(err.message)
//     }
// }


//2. NACIN - samo koristi aggregate nad modelom
const GetFilteredJobAds = async (req, res)=>{
    try{
        let date = new Date(Date.now())
        let reslist = await JobAd.aggregate([
            {
                "$search":{
                    "index":"trazenjeOglasa",
                    "text":{
                        "query":req.body.trazeniTag,
                        "path":["tags","name","city"]
                    }
                }
            },
            {"$match": { expireAt: { $gte: date } } },
            {"$sort":{ createdAt: -1}}
        ])
        res.status(200).send(reslist)
    }
    catch(err){
        res.status(500).send(err.message)
        console.log(err)
    }
}

const GetFilteredJobAdsByTags = async (req, res)=>{
    try{
        let date = new Date(Date.now())
        let reslist = await JobAd.aggregate([
            {
                "$search":{
                    "index":"trazenjeOglasaPoTagu",
                    "text":{
                        "query":req.params.tag,
                        "path":["tags"]
                    }
                }
            },
            {"$match": { expireAt: { $gte: date } } },
            {"$sort":{ createdAt: -1}}
        ])
        res.status(200).send(reslist)
    }
    catch(err){
        res.status(500).send(err.message)
        console.log(err)
    }
}


const GetCompaniesJobAds = async (req, res)=>{
    try{
        const companyID = req.params.companyID
        let companiesJobAds = await JobAd.find({ companyID })
        // let list = await JobAd.find({ companyID })
        // let companiesJobAds=[]
        // let candidates=[]
        // let obj={
        //     jobAd: null,
        //     numOfCandidates: ""
        // }
        // for await (el of list){
        //     candidates = await JobUserRel.find({jobID: el._id})
        //     obj.jobAd=el
        //     obj.numOfCandidates=candidates.length
        //     companiesJobAds.push(obj)
        // }
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
const UpdateTagsToJobAd = async(req,res)=>{
    try{
        await JobAd.findById(req.params.id).then(result=>{
            result.tags = req.body.tags
            result.save().then(()=>{
                res.status(200).send('Uspesno izmenjeno')
            })
        })

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
    GetCompaniesActiveJobAds,
    GetFilteredJobAds,
    GetAllTags,
    UpdateTagsToJobAd,
    GetFilteredJobAdsByTags
}