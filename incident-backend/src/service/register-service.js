const { dbManager } = require("./db-manager");
const bcrypt = require("bcrypt");

const register = async (role, email, password, firstName, lastName) => {
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
  const found = await model.findOne({ email: email });
  if (found) {
    return Promise.reject({ message: "User already existed" });
  }

  // Create account
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const account = new model({
    email: email,
    password: hash,
    firstName: firstName,
    lastName: lastName,
  });

  // Update collection
  await account.save();
  return Promise.resolve();
};

module.exports = {
  register,
};
