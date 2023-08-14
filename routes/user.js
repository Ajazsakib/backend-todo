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

module.exports = router;
