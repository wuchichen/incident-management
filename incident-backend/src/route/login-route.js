const router = require("express").Router();
const loginController = require("../controller/login-controller");

router.post("/user", loginController.userLogin);

router.post("/admin", loginController.adminLogin);

module.exports = router;
