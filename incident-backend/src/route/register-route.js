const router = require("express").Router();
const registerController = require("../controller/register-controller");

router.post("/user", registerController.userRegister);

router.post("/admin", registerController.adminRegister);

module.exports = router;
