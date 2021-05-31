const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    posts:[ {
        type: Schema.Types.ObjectId,
        ref:'Blog'
    }],
    
}, {timestamps: true });

module.exports = mongoose.model('User',userschema);
