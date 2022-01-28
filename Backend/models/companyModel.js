const M = require('minimatch');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const companySchema = new Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    contactTel:{
        type:String
    },
    contactEmail:{
        type:String,
        required:true
    },
    jobAds:{
        type:Array,
        items: {
            type: String
          }
    },
    categories:{
        type:Array,
        items: {
            type: String
          }
    },
    socialMedia:{
        instagramLink:{
            type:String
        },
        facebookLink:{
            type:String
        },
        linkedInLink:{
            type:String
        },
        twitterLink:{
            type:String
        }
    }
  });

  const Company = mongoose.model('Company', companySchema);

  module.exports = {
      Company
  }