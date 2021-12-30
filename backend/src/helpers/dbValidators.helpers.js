const { userModel } = require("../model");

/**
 * @description this function validates if the email exists in the database
 * @param {*} email
 * @author Camilo Morales Sanchez
 */
const validateExsitingEmail = async (email) => {
  const emailTemp = email.toUpperCase();
  const user = await userModel.findOne({ email:emailTemp });

  if (user) {
    throw new Error(`email: ${email} is already registered!!`);
  }
};



module.exports = {
  validateExsitingEmail,
};
