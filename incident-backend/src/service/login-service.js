const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { dbManager } = require("./db-manager");

/**
 *
 * @param {"user"|"admin"} role
 * @param {string} email
 * @param {string} password
 * @returns {Promise<any>}
 */
const login = async (role, email, password) => {
  // Fetch data
  var model;
  switch (role) {
    case "user":
      model = dbManager.user.model;
      break;
    case "admin":
      model = dbManager.admin.model;
      break;
    default:
      return Promise.reject({ message: "Invalid role" });
  }

  // Validation
  var account = await model.findOne({ email: email });
  if (!account) {
    return Promise.reject({ message: "User does not exist" });
  }

  // Compare hashed password
  const valid = await bcrypt.compare(password, account.password);
  if (valid) {
    // Generate access token
    var token = jwt.sign(
      {
        _id: account._id,
        email: account.email,
        role: role,
        firstName: account.firstName,
        lastName: account.lastName,
      },
      process.env.TOKEN_SECRET,
      { algorithm: process.env.TOKEN_ALGORITHM },
    );
    return Promise.resolve({ access_token: token });
  } else {
    return Promise.reject({ message: "Incorrect password" });
  }
};

module.exports = {
  login,
};
