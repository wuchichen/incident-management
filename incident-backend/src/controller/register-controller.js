const bcrypt = require("bcrypt");
const registerSvc = require("../service/register-service");

const userRegister = async (req, res) => {
  try {
    await registerSvc.register(
      "user",
      req.body.email,
      req.body.password,
      req.body.firstName,
      req.body.lastName,
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const adminRegister = async (req, res) => {
  try {
    await registerSvc.register(
      "admin",
      req.body.email,
      req.body.password,
      req.body.firstName,
      req.body.lastName,
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  userRegister,
  adminRegister,
};
