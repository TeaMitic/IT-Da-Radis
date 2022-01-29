const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jobAdSchema = new Schema({
    companyID:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    expireAt:{
        type:Date,
        required:true
    },
    tags:{
        type:Array,
        items: {
            type: String
          }
    }
}, {timestamps:{createdAt:true, updatedAt:false}})


const JobAd = mongoose.model('JobAd', jobAdSchema)

module.exports = {
    JobAd
}