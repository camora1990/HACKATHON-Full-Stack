const { userModel } = require("../model");

/**
 * @description this function validates if the email exists in the database
 * @param {*} email
 * @author Camilo Morales Sanchez
 */
const validateExsitingEmail = async (email) => {
  const user = await userModel.findOne({ email });
  
  if (user) {
    throw new Error(`email: ${email} is already registered!!`);
  }
};

module.exports = {
  validateExsitingEmail,
};
