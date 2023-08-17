const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controller/userController');

console.log('Router Loaded');

router.get('/registration', userController.registration);

router.post('/createUser', userController.createUser);

// use passport as a middleware to authenticate
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/registration' }),
  userController.login
);

router.get('/', userController.login);

router.get('/logout', userController.logout);

router.get('/profile/:id', userController.userProfile);

router.post('/update-profile/:id', userController.updateUser);

module.exports = router;
