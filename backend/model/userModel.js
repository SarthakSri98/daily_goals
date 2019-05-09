const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    email : { type:String, unique:true },
    password : { type:String }
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema); //User's P should always be uppercase
