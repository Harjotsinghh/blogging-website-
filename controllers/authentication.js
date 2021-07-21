const express = require('express');
const User = require('../models/users');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const Rtoken = require('../models/token');
const cookie = require('cookie');

exports.postsignup = async (req,res,next)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const name= req.body.name;
    // console.log(req.body);
        const finduser = await User.findOne({email: email});
        if(finduser)
        return res.status(400).json({ error: 'email already exist'});
        const findusername = await User.findOne({username: username});
        if(findusername)
        return res.status(400).json({error: 'username already taken'});
        if(password!= confirmpassword)
        return res.status(400).json({error: 'Password doesn\'t match'});

        const hashedPass= await bcrypt.hash(password, 12);
        const userdoc = new User({
            name:name,
            username:username,
            email:email,
            password:hashedPass,
            posts:[]
        });
        userdoc.save()
                .then(result=>{
                    res.status(201).json({
                        message: 'user created successfully',
                        result: result
                    })
                })
                .catch(err=>{
                    res.status(400).json({
                        error:err
                    })
                });
}


exports.postlogin= async (req, res , next)=>{
    const username = req.body.username;
    const password = req.body.password;
    // console.log(req.body);
    const findUser = await User.findOne({username: username});
    if(!findUser)
    return res.status(401).json({error: 'Please check your username or password'});

    const passwordcheck = await bcrypt.compare(password, findUser.password);
    if(!passwordcheck)
    return res.status(401).json({error:'Please check your username or password'});

    const token = await jwt.sign({username:username},'aja_mexico_chaliae',{expiresIn : '2h'});
    const refreshToken = await jwt.sign({username:username},'aja_mexico_chaliae',{expiresIn:'31d'});
    const newrtoken = new Rtoken({refreshtoken: refreshToken});
    const saved_token = await newrtoken.save();
    res.setHeader('Set-Cookie', cookie.serialize('rtoken',`${refreshToken}`, {
            expires: new Date(Date.now() + 60*24*60*60*1000),
            sameSite:'none',
            secure:true,
            httpOnly:true
    }))
    
    res.status(200)
        .json({token: token, message:"successfully logged in "});

}
exports.gettoken = async ( req, res, next)=>{

    if(!req.cookies.rtoken)
    return res.status(401).json({error: 'not authorized'});

    const token = req.cookies.rtoken;
    const verified =  await jwt.verify(token,'aja_mexico_chaliae');
    if(!verified)
    res.status(401).json({error:'not authorized'});

    const accesstoken= await jwt.sign({username:verified.username},'aja_mexico_chaliae',{expiresIn : '1d'});
    
    res.status(200).json({token:accesstoken});
}

exports.getsignout = async (req, res, next) => {
    try{
        const token = req.cookies.rtoken;
        if(token)
        {
            await Rtoken.deleteOne({refreshtoken : token});
        }
        res.setHeader('Set-Cookie', cookie.serialize('rtoken',`${token}`, {
            expires: Date.now(),
            sameSite:'none',
            secure:true,
            httpOnly:true
       }))
    }
    catch(err){
        console.log(err);
    }

   
    res.status(200).json({msg: 'successfully loggedout'});
}