const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cookieParser= require('cookie-parser');
const dotenv = require('dotenv')
const helmet = require('helmet')
dotenv.config();
//routes
const authroutes = require('./routes/authentication');
const postsroutes = require('./routes/posts');
const adminroutes = require('./routes/admin');


//mongodb_uri
const mongoDbUri= `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.vuvyc.mongodb.net/myblogs?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(cookieParser());
//cors
app.use((req,res,next)=>{
    if(req.headers.credentials)
    res.setHeader('Access-Control-Allow-Origin',req.header('origin'));
    else
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Credentials',true);
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});
 
app.use(helmet())
//routes
app.use(authroutes);
app.use(postsroutes);
app.use('/admin',adminroutes);



mongoose.connect(mongoDbUri,{useNewUrlParser:true, useUnifiedTopology:true})
        .then((res)=>{
            // console.log(res);
            app.listen(process.env.PORT||8080);
        })
        .catch(err=>{
            console.log(err);
});



