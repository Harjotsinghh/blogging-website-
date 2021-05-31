const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
    ,
    imgUrl:{
        type:String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
},{timestamps : true});

module.exports = mongoose.model('Blog',blogschema);