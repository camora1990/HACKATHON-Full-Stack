const { userModel, productModel } = require("../model");

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

/**
 * @description this function validates if user exist in databae
 * @param {*} id
 */
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

/**
 * @description this function validates if product exist in databae
 * @param {*} id
 */
const validateExistingProduct = async (id) => {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Product not found in data base");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = {
  validateExsitingEmail,
  validateExistingUser,
  validateExistingProduct,
};
