const express = require('express');
const router = express.router;

const taskController = require('../controller/taskController');
const taskStatusController = require('../controller/taskStatusController');
const userController = require('../controller/userController');

router.post('/task',taskController.postTasks);
router.get('/task',taskController.getTasks);

router.post('/taskStatus',taskStatusController.postTaskStatus);

module.exports = router;