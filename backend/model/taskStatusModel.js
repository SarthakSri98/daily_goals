const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./taskModel');

const taskStatusSchema = new Schema({
    date : { type:Date },
    tasksStatusData : [ {task:String, taskStatus:Boolean} ],
    // taskStatus : [ {type:Boolean } ]
})

module.exports = mongoose.model('TaskStatus',taskStatusSchema); //Post's P should always be uppercase
