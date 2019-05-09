var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const taskSchema = new Schema({
    task : {type:String},
    priority : { type:Number }
})

module.exports = mongoose.model('Task',taskSchema); //Post's P should always be uppercase
