const { userModel } = require("../model");

/**
 * @description this function validates if the email exists in the database
 * @param {*} email
 * @author Camilo Morales Sanchez
 */
const validateExsitingEmail = async (email) => {
  const emailTemp = email.toUpperCase();
  try {
    const user = await userModel.findOne({ email: emailTemp });
    if (user) {
      throw new Error(`email: ${email} is already registered!!`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateExistingUser = async (id) => {
  try {
    const user = await userModel.findById(id);
    if (!user || !user.status) {
      throw new Error("User not found in data base");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  validateExsitingEmail,
  validateExistingUser,
};
