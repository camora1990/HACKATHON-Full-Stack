const { request, response } = require("express");
const { encryptPassword, generateJWT } = require("../helpers");
const { userModel } = require("../model");

const createUser = async (req = request, res = response) => {
  const { name, isAdmin, password } = req.body;
  const email = req.body.email.toUpperCase().trim();
  try {
    const user = new userModel({
      name,
      email,
      isAdmin,
      password,
    });

    user.password = await encryptPassword(password);
    await user.save();

    token = await generateJWT(email, user._id, isAdmin, name);

    res.status(201).json({
      ok: true,
      status: 201,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const listUser = async (req = request, resp = response) => {};

module.exports = {
  createUser,
};
