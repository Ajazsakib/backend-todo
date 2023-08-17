// Create Task using jQuery and ajax

$(document).ready(function () {
  var newTask = $('#createTask');

  newTask.submit(function (e) {
    e.preventDefault();
    var taskData = {
      taskName: $('#taskName').val(),
    };

    $.ajax({
      type: 'POST',
      url: '/task/create-task',
      data: newTask.serialize(),
      success: function (response) {
        window.history.pushState(null, null, '/');
        window.location.href = '/';
      },
      error: function (error) {
        console.log('Error creating task:', error);
      },
    });
  });
});

// delete task using jquery and ajax

$(document).ready(function () {
  $('.deleteTask').click(function (e) {
    e.preventDefault();
    var taskId = $(this).data('task-id');
    var deleteLink = $(this).attr('href');
    var taskElement = $(this).closest('.task-box');
    $.ajax({
      type: 'GET',
      url: deleteLink,
      data: { id: taskId },
      success: function (response) {
        // Handle success
        alert('Deleted Successfully');
        taskElement.remove();
      },
      error: function (error) {
        console.log('Error deleting task:', error);
      },
    });
  });
});
