const express = require("express");

const router = express.Router();

const passport = require("passport");

const registerController = require("../controller/registerController");

console.log("Router Loaded");

router.get("/", registerController.registration);

router.post("/createUser", registerController.createUser);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/registration" }),
  registerController.login
);

module.exports = router;
