const express = require('express');
const User = require('../models/users');
const Blog = require('../models/blogs');
const { sign } = require('jsonwebtoken');
const mongoose = require('mongoose')


exports.getposts = async (req, res, next)=>{
    const posts= await  Blog.find({}).sort({createdAt: -1}).populate('userId','username');
    res.status(200).json({posts: posts});
}
exports.getpost = async( req, res, next)=>{
    const postid  = req.params.postid
    const post = await Blog.findOne({_id:mongoose.Types.ObjectId(postid)}).populate('userId','username')
    res.status(200).json({post : post})
}


