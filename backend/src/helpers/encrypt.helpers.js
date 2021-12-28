const bcrypt = require("bcrypt");

/**
 * @description Encrypt password with salt 10
 * @param {*} password
 * @returns hashSync
 * @author Camilo Morales Sanchez
 */
const encryptPassword = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(15);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
    throw new Error(error.message);
  }
};

const validatePassword = async(hash, password)=>{

  try {
    return bcrypt.compareSync(password,hash)
  } catch (error) {
    return false
  }

}

module.exports = {
  encryptPassword,
  validatePassword
};
