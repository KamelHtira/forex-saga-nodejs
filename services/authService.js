const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.findUserByUsername = async (username) => {
  return User.findOne({ username });
};

exports.hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

exports.validatePassword = async (user, plainPassword) => {
  // user.password is the hashed password
  return await bcrypt.compare(plainPassword, user.password);
};
