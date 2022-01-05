const { Router } = require("express");
const { createProduct } = require("../controller/product.controller");
const { check } = require("express-validator");
const { validateFields ,validateJWT, validateUser, validateFile } = require("../middlewares");



const route = Router();

route.post(
  "/create-product",
  [
    
    validateJWT,
    validateUser,
    check("name", "Name is required!!").not().isEmpty(),
    check("description", "Description is required!!").notEmpty(),
    check("price", "Price is required!!")
      .notEmpty()
      .isNumeric()
      .withMessage("price is not numeric"),
    check("raiting", "Raiting Min:0 Max:5")
      .if(check("raiting").notEmpty())
      .isFloat({ min: 0, max: 5 }),
    validateFields,
    validateFile
  ],
  createProduct
);

module.exports = route;
