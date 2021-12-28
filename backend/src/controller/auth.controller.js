const { request, response } = require("express");
const { generateJWT } = require("../helpers");

const login = async (req = request, res = response) => {
  const { user } = req.body;

  try {
    const token = await generateJWT(
      user.email,
      user._id,
      user.isAdmin,
      user.name
    );

    res.status(200).json({
      ok: true,
      status: 200,
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
