const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginSvc = require("../service/login-service");

const userLogin = async (req, res) => {
  try {
    const result = await loginSvc.login(
      "user",
      req.body.email,
      req.body.password,
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const result = await loginSvc.login(
      "admin",
      req.body.email,
      req.body.password,
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  userLogin,
  adminLogin,
};
