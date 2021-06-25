const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cookieParser= require('cookie-parser');

//routes
const authroutes = require('./routes/authentication');
const postsroutes = require('./routes/posts');
const adminroutes = require('./routes/admin');


//mongodb_uri
const mongoDbUri= 'mongodb+srv://harjot:JD4CN2vk6ZAYXsK@cluster0.vuvyc.mongodb.net/myblogs?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser);

//cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});
 

//routes
app.use(authroutes);
app.use(postsroutes);
app.use('/admin',adminroutes);



mongoose.connect(mongoDbUri,{useNewUrlParser:true, useUnifiedTopology:true})
        .then((res)=>{
            // console.log(res);
            app.listen(8080);
        })
        .catch(err=>{
            console.log(err);
});



