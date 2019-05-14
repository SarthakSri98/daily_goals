const express = require('express');
const router = express.Router();

const taskController = require('../controller/taskController');
const taskStatusController = require('../controller/taskStatusController');
const userController = require('../controller/userController');

router.post('/task',taskController.postTasks);
router.get('/task',taskController.getTasks);
router.delete('/task',taskController.deleteTasks);
router.put('/task',taskController.editTasks);

router.post('/taskStatus',taskStatusController.postTaskStatus);
router.get('/getTaskStatuses',taskStatusController.getTaskStatuses);


module.exports = router;