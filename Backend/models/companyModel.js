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
    site:{
        type:String
    },
    contactTel:{
        type:String
    },
    email:{
        type:String,
        required:true
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

  companySchema.pre('save', async function(next){
    const salt = 10
    this.password = await bcrypt.hash(this.password, salt)
    next()
})



const Company = mongoose.model('Company', companySchema);

module.exports = {
      Company
}