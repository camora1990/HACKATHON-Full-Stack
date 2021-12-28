const { request, response } = require("express");
const { validationResult } = require("express-validator");


/**
 * @description validates if the request parameters are correct
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @author Camilo Morales Sanchez
 * @returns 
 */
const validateFields = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      status: 400,
      errors:errors.errors
    });
  }
  next()
};

module.exports={
    validateFields
}
