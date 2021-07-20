const express= require('express');
const User = require('../models/users');
const Blog = require('../models/blogs');


exports.postposts= async (req, res, next)=>{
    console.log(req.body)
    const title = req.body.title;
    const text = req.body.text;
    const imageUrl= req.body.imgUrl;
    const username = req.body.username;
    const userdoc = await User.findOne({username: username});
    const userId = userdoc._id;  

    const newBlog = new Blog({
        title:title,
        text:text,
        imgUrl:imageUrl,
        userId:userId
    });
    newBlog.save().then(result=>{
        res.status(201).json({blog: result, msg:'post saved successfully'});
    })
    .catch(err=>{
        res.status(500).json({err:err});
    })
    
 
 }
 exports.getposts= async (req,res, next)=>{
     const username  = req.body.username;
    //  console.log(username);
    const userdoc = await (await User.findOne({username:username}))._id;
    const posts = await Blog.find({userId: userdoc}).populate('userId','username');
    // console.log(userdoc);
    res.status(200).json({posts:posts});

 }

 exports.deletepost = async (req, res, next)=>{ 
    const id = req.params.id;
    try{
    
        const deletedpost = await Blog.findByIdAndDelete(id);
        // console.log(deletedpost);
        res.status(200).json({msg:"deleted successfully"});

    }   
    catch(e){
        return res.status(500).json({err: "cannot delete"});
    }

 }