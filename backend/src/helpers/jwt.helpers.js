const jwt = require("jsonwebtoken");
/**
 * @description This function generates JWT
 * @param {*} email
 * @param {*} id
 * @param {*} isAdmin
 * @author Camilo Morales Sanchez
 * @returns
 */
const generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
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


/**
 * @description decrypts the token and returns the payload
 * @param {*} token 
 * @author Camilo Morales Sanchez
 * @returns Payload from token
 */
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
