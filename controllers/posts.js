const express = require('express');
const User = require('../models/users');
const Blog = require('../models/blogs');
const { sign } = require('jsonwebtoken');



exports.getposts = async (req, res, next)=>{
    const posts= await  Blog.find({}).sort({createdAt: -1}).populate('userId','username');
    // console.log(req.cookies);
    res.status(200).json({posts: posts});
}


