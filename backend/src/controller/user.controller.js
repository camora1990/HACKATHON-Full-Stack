const { request, response } = require("express");
const { encryptPassword } = require("../helpers");
const { userModel } = require("../model");

const createUser = async (req = request, res = response) => {
  const { name, email, isAdmin, password } = req.body;
  try {
    const user = new userModel({ name, email, isAdmin, password });

    user.password = await encryptPassword(password);
    await user.save();

    res.status(201).json({
      ok: true,
      status: 201,
      user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
};
