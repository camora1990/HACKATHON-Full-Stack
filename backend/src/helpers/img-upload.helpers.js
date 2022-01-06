const path = require("path");
const { v4: uuidv4 } = require("uuid");

const validExtensions = ["jpg", "png", "jpeg", "gif","JPG","PNG","JPEG"];
/**
 * @description Upload file in local folder
 * @param {*} files 
 * @author Camilo Morales Sanchez
 * @returns 
 */
const uploadFile = (files) => {
  return new Promise((resolve, reject) => { 
    const { img } = files;
    const splitName = img.name.split(".");
    const extension = splitName[splitName.length - 1];

    if (!validExtensions.includes(extension)) {
      throw new Error( `Invalid extension, allowed extension are: [${validExtensions}]`)
    }
    const fileTemp = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, "../storage/products/", fileTemp);
    img.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
    });
    resolve(fileTemp);
  });
};

module.exports = {
  uploadFile,
};
