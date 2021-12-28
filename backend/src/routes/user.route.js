const { Router } = require("express");
const { createUser } = require("../controller");
const { check } = require("express-validator");
const { validateExsitingEmail } = require("../helpers");
const { validateFields } = require("../middlewares");

const route = Router();

route.post(
  "/register",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("email is required!")
      .isEmail()
      .withMessage("enter valid email")
      .if(check("email").isEmail())
      .custom(validateExsitingEmail),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required!")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "i")
      .withMessage(
        "The password must contain a minimum of 8 characters, uppercase, lowercase and numbers"
      ),validateFields
  ],
  createUser
);

module.exports = route;