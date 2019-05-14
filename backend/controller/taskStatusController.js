var Task = require('../model/taskModel');
var TaskStatus = require('../model/taskStatusModel');
const async = require("async");
var nJwt = require("jsonwebtoken");



exports.postTaskStatus = function(req,res)
{
      const date = new Date(req.body.date);
      let taskStatus = new TaskStatus({
          date : date,
          tasksStatusData : req.body.tasksStatusData,
          // taskStatus : req.body.taskStatus
      })
      console.log(taskStatus);
      taskStatus.save().then(postStatus=>{
             res.status(200).json({
                 message:"Status updated succesfully",
                 data : postStatus
             })
      }).catch(err=>{
          console.log(err);
          res.status(404).json({
              error:err,
              message:"There has been some error"
          })
      })
}

exports.getTaskStatuses = function(req,res)
{
    TaskStatus.find().exec((err,data)=>{
      console.log(err,data);
      res.status(200).json({
        message:"Here is the task history for the previous days",
        data : data,
      })
    })
}