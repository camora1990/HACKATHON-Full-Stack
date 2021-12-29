const jwt = require("jsonwebtoken");
/**
 * @description This function generates JWT
 * @param {*} email
 * @param {*} id
 * @param {*} isAdmin
 * @author Camilo Morales Sanchez
 * @returns
 */
const generateJWT = (email, id, isAdmin, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email,
      id,
      isAdmin,
      name,
    };
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          reject("The token could not be generate");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyJWT = async(token)=>{

  try {
    return jwt.verify(token,process.env.PRIVATE_KEY)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

module.exports={
    generateJWT,
    verifyJWT
}
