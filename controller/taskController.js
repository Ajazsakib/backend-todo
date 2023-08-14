const Task = require('../models/task');

module.exports.addTask = function (req, res) {
  return res.render('addTask', {
    title: 'Create Todo Form',
    heading: 'Add Your Task',
  });
};

module.exports.createTask = async function (req, res) {
  try {
    const task = await Task.create({
      taskName: req.body.taskName,
      user: req.user._id,
    });
    console.log(task);
    if (task) {
      return res.redirect('/');
    }
  } catch (err) {
    console.log('Error in creating Task', err);
  }
};

module.exports.deleteTask = async function (req, res) {
  try {
    await Task.deleteOne({ _id: req.params.id });
    return res.redirect('/');
  } catch (err) {
    console.log('Error in Deleting Task', err);
  }
};

module.exports.editForm = function (req, res) {
  return res.render('editTask', {
    title: 'Edit Task',
    heading: 'Edit Your Task',
    id: req.params.id,
  });
};

module.exports.editTask = async function (req, res) {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect('/');
  } catch (err) {
    console.log('Error in updating task', err);
  }
};
