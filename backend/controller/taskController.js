var Task = require('../model/taskModel');

const async = require("async");
var nJwt = require("jsonwebtoken");



exports.getTasks = function (req, res) {
  Task.find().exec((err, task_list) => {
    res.status(200).json({
      error: err,
      result: task_list
    })
  })
}

exports.postTasks = function (req, res) {
  console.log("posting starts", req.body)
  nJwt.verify(req.body.token, "the_good_the_bad_and_the_uchihas", function (err, token) {

    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "user not authorized",
        authorised: false
      })
    }

  })

  var tasks = new Task({
    taskData: req.body.taskData
  })

  console.log('new task is', tasks);

  tasks.save().then(
    (createdTask) => {
      res.status(200).json({
        result: "Task created successfully",
        data: {
          ...createdTask,
          _id: createdTask._id,
          authorised: true

        }
      })
    }
  ).catch((error)=>{
    res.status(404).json({
        message:"There was an error :"+error
    })
})
}

exports.editTasks = function (req, res) {
  console.log("posting starts", req.body)
  nJwt.verify(req.body.token, "the_good_the_bad_and_the_uchihas", function (err, token) {

    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "user not authorized",
        authorised: false
      })
    }

  })

  const tasks = new Task({
    _id : req.body._id,
    taskData: req.body.taskData
  })
  console.log('1',tasks._id);
  console.log('2',req.body._id);
  console.log('3',tasks.taskData);
  // console.log('new task is', tasks);

  Task.findByIdAndUpdate({ _id:req.body._id },tasks,{upsert: true, new: true}).then(
    (updatedTask) => {
      console.log(updatedTask);
      res.status(200).json({
        result: "Tasks updated successfully",
        data: {
          ...updatedTask,
          _id: updatedTask._id,
          authorised: true

        }
      })
    }
  ).catch((error)=>{
    res.status(404).json({
        message:"There was an error :"+error
    })
})
}

exports.deleteTasks = function(req,res)
{

        Task.deleteMany().then(results=>{
            console.log(results);
        })
        res.status(200).json({
            message:"Previous tasks deleted successfully",
        });
    
}