const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const user = require('./routes/userRoutes')
const company = require('./routes/companyRoutes')
const jobAd = require('./routes/jobAdRoutes')
const auth = require('./routes/authRoutes')
const jobUserRel= require('./routes/jobUserRelRoutes')
const fileUpload = require('express-fileupload')
// const env= process.env

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(fileUpload({
  createParentPath:true
}))
// app.use(express.static("D:\\Users\\Pictures\\stickers"))


app.use('/api/user', user);
app.use('/api/company', company);
app.use('/api/jobAd', jobAd);
app.use('/api/auth', auth);
app.use('/api/jobUserRel', jobUserRel);


 const dbURI = 'mongodb+srv://itdaradisuser:itdaradis99@itdaradis.qszzm.mongodb.net/itDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) =>{
  app.listen(5000,() => {
    console.log('Server is listening on port 5000...');
    });
  })
  .catch((err) => console.log(err));

