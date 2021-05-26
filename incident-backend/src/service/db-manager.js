const user = require("../model/user");
const admin = require("../model/admin");
const incident = require("../model/incident");

module.exports.dbManager = {
  user,
  admin,
  incident,
};
