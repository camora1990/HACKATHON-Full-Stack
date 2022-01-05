const { request, response } = require("express");
const { encryptPassword, generateJWT } = require("../helpers");
const { userModel } = require("../model");

/**
 * @description Controller to register user
 * @param {*} req
 * @param {*} res
 * @author Camilo Morales Sanchez
 */
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
    const payload = {
      email,
      id: user._id,
      isAdmin: user.isAdmin,
      name,
    };
    token = await generateJWT(payload);

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

/**
 * @description Controller to list all user, for rol admin
 * @param {*} req
 * @param {*} res
 * @author Camilo Morales Sanchez
 */
const listUser = async (req = request, res = response) => {
  const { limit = 5, page = 1 } = req.query;
  try {
    const { docs: users, ...information } = await userModel.paginate(
      { status: true },
      { limit, page }
    );
    res.status(200).json({
      ok: true,
      status: 200,
      users,
      information
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    await userModel.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "User deleted successfully",
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
  deleteUser,
  listUser,
};
