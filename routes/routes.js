const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const paperwork = require("paperwork");
const validation = require("../validation");

router.post(
  "/signUp",
  paperwork.accept(validation.register.registerVal),
  controller.user.userSign
);

module.exports = router;
