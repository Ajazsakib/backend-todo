const Task = require('../models/task');

module.exports.home = async function (req, res) {
  if (req.isAuthenticated()) {
    const tasks = await Task.find({ user: req.user._id });

    return res.render('home', {
      title: 'Todo App',
      msg: 'Todo App Using Node Express Mongo Db',
      tasks: tasks,
      user: req.user,
    });
  } else {
    return res.render('login', {
      title: 'Login || Todo App',
      heading: 'Login Form',
    });
  }
};
