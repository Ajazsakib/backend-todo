const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.registration = function (req, res) {
  return res.render('registration', {
    title: 'Register || Todo App',
    heading: 'Registration Form',
  });
};

module.exports.createUser = function (req, res) {
  User.findOne({ username: req.body.username })
    .then(function (user) {
      if (!user) {
        User.create(req.body)
          .then(function (newUser) {
            if (newUser) {
              return res.redirect('/');
            }
          })
          .catch(function (err) {
            console.log('Error in Creating User', err);
          });
      }
    })
    .catch(function (err) {
      console.log('Error in Finding user');
    });
};

module.exports.login = function (req, res) {
  return res.redirect('/');
};

module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports.userProfile = async function (req, res) {
  const user = await User.findById(req.params.id);

  return res.render('profile', {
    title: 'User Profile',
    user: user,
  });
};

module.exports.updateUser = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log('*******multer Error:', err);
        }
        user.name = req.body.name;
        if (req.file) {
          // this is saving the path of the uploaded file into the avatar field in the user
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('/');
      });
    }
  } catch (err) {
    console.log('Error in updating user', err);
  }
};
