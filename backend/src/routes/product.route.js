const { Router } = require("express");
const {
  createProduct,
  listProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/product.controller");
const { check } = require("express-validator");
const {
  validateFields,
  validateJWT,
  validateUser,
  validateFile,
} = require("../middlewares");
const { validateExistingProduct } = require("../helpers");

const route = Router();

route.get("/", [validateJWT, validateUser], listProducts);

route.delete(
  "/delete-product/:id",
  [
    validateJWT,
    validateUser,
    check("id", "Invalid mongo id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingProduct),
    validateFields,
  ],
  deleteProduct
);

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
    validateFile,
  ],
  createProduct
);

route.put("/update-product/:id", [
  validateJWT,
  validateUser,
  check("id", "inalid mongo id")
    .isMongoId()
    .if(check("id"))
    .custom(validateExistingProduct),
    validateFields,
  validateFile,
],updateProduct);

module.exports = route;
