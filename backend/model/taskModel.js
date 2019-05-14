var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskData:[ {taskName:String, priority:Number }]
    
})

module.exports = mongoose.model('Task',taskSchema); //Post's P should always be uppercase
