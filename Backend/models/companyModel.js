const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const companySchema = new Schema({
    username:{
        type:String,
        required: true,
        unique:true
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
    website:{
        type:String
    },
    contactTel:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    image:{
        name: String,
        img:{
            data:Buffer,
            contentType: String
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