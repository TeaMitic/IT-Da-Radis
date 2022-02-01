const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jobUserRelSchema = new Schema({
    jobID:{
        type:String,
        required: true
    },
    userID:{
        type:String,
        required:true
    },
    cv:{
        type: String,
        // required:true
    },
    userEmail:{
        type:String, 
        required:true
    },
    userTel:{
        type:String, 
        required:true 
    }
});

const JobUserRel = mongoose.model('JobUserRel', jobUserRelSchema);
module.exports={
    JobUserRel
}