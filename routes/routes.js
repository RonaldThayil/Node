const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const paperwork = require("paperwork");
const validation = require("../validation");
const middleWare = require("../middleware/auth");
const { send } = require("express/lib/response");


router.get('/getdata',
  (res, req) => { res.send('Hello World') })

router.post("/upLoad", controller.user.fileUpload);

router.post(
  "/signUp",
  paperwork.accept(validation.register.registerVal),
  controller.user.userSign
);
router.post("/logIn", controller.user.userLogin);
router.post("/changepaswword", middleWare, controller.user.changepassword);
module.exports = router;
