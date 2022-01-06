const { request, response } = require("express");
const { generateJWT, validatePassword } = require("../helpers");

/**
 * @description Controller to login
 * @param {*} req
 * @param {*} res
 * @author Camilo Morales Sanchez
 * @returns
 */
const login = async (req = request, res = response) => {
  const { password, payload } = req.body;
  const { user } = req;
  try {
    const verifyPassword = await validatePassword(user.password, password);
    if (!verifyPassword) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Username or password are incorrect",
      });
    }
    const token = await generateJWT(payload);

    res.status(200).json({
      ok: true,
      status: 200,
      name: payload.name,
      isAdmin: payload.isAdmin,
      id: payload.id,
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

module.exports = {
  login,
};
