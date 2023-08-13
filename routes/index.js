const express = require("express");

const router = express.Router();

const homeController = require("../controller/homeController");

console.log("Router Loaded");

router.get("/", homeController.home);

router.use("/registration", require("./registration"));

module.exports = router;
