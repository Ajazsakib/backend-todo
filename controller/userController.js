const User = require('../models/user');
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
