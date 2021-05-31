const express = require('express');
const User = require('../models/users');
const Blog = require('../models/blogs');
const { sign } = require('jsonwebtoken');



exports.getposts = async (req, res, next)=>{
    const posts= await  Blog.find({}).populate('userId','username');
    res.status(200).json({posts: posts});
}


