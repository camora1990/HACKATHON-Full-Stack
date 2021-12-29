const { request, response } = require("express");
const { verifyJWT } = require("../helpers");
const { userModel } = require("../model");

/**
 * @description valida if user exist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const validateUser = async (req = request, res = response, next) => {
  const email = req.body.email.toUpperCase().trim();
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
      status: 500,
      message: error.message,
    });
  }
  next();
};

const validateJWT = async (req = request, res = response, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const payload = await verifyJWT(token);
    req.body.email = payload.email
    req.body.payload = payload
  } catch (error) {
    return res.status(401).json({
      ok: false,
      status: 401,
      message: error.message,
    });
  }
  next();
};

const validateAdmin = (req = request, res = response, next)=>{

  const {isAdmin} = req.body.payload
  if (!isAdmin) {
    return res.status(401).json({
      ok: false,
      status: 401,
      message: "Unauthorization user",
    });
  }
  next()
}



module.exports = {
  validateUser,
  validateJWT,
  validateAdmin
};
