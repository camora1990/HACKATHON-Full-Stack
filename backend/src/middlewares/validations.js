const { request, response } = require("express");
const { userModel } = require("../model");

/**
 * @description valida if user exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const validateUser = async (req = request, res = response, next) => {

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

    req.body.user = user;
  } catch (error) {
    return res.status(500).json({
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
