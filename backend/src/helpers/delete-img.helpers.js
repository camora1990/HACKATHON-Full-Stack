const path = require("path");
const fs = require("fs");
const { promisify } = require("util");


/**
 * @description Delete local image
 * @param {*} productName 
 * @author Camilo Morales Sanchez
 */
const deleImgLocal = async (productName) => {
  promisify(fs.unlink)(path.resolve(__dirname, "../storage/products", productName));
  
};

module.exports = {
  deleImgLocal,
};
