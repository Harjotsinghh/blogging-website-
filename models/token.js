const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenschema = new Schema({
    refreshtoken:{
        required:true,
        type:String
    }
});

module.exports= mongoose.model('RefreshToken',tokenschema);