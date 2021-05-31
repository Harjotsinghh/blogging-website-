const express = require('express');
const User = require('../models/users');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postsignup = async (req,res,next)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const name= req.body.name;
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
                    res.status(401).json({
                        error:err
                    })
                });
    
}

exports.postlogin= async (req, res , next)=>{
    const username = req.body.username;
    const password = req.body.password;

    const findUser = await User.findOne({username: username});
    if(!findUser)
    return res.status(401).json({error: 'username not found'});

    const passwordcheck = await bcrypt.compare(password, findUser.password);
    if(!passwordcheck)
    return res.status(401).json({error:'password didn\'t match'});

    const token = await jwt.sign({username:username},'aja_mexico_chaliae',{expiresIn : '1h'});
    
     res.status(200).json({token: token, message:"successfully logged in "});

}