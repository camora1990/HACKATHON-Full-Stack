const { request, response } = require("express");
const { validatePassword } = require("../helpers");
const { userModel } = require("../model");

const validateUser = async (req = request, res = response, next) => {
  const { password } = req.body;
  const email =req.body.email.toUpperCase().trim();
 
  try {

    const user = await userModel.findOne({ email });
    if (!user || !user.status) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Username or password are incorrect",
      });
    }

    const verifyPassword = await validatePassword(user.password, password);
    if (!verifyPassword) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Username or password are incorrect",
      });
    }
    
    req.body.user = user;
  } catch (error) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: error.message,
    });
  }
  next();
};

module.exports = {
  validateUser,
};
