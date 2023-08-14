const express = require('express');

const router = express.Router();

const passport = require('passport');

const taskController = require('../controller/taskController');

router.get('/add', taskController.addTask);

router.post(
  '/create-task',
  passport.checkAuthentication,
  taskController.createTask
);

router.get(
  '/delete/:id',
  passport.checkAuthentication,
  taskController.deleteTask
);

router.get('/edit/:id', passport.checkAuthentication, taskController.editForm);

router.post(
  '/edit-task/:id',
  passport.checkAuthentication,
  taskController.editTask
);

module.exports = router;
