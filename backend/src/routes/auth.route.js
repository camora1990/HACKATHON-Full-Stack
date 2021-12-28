const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controller");
const { validateFields } = require("../middlewares");
const { validateUser } = require("../middlewares/validations");

const route = Router();

route.post(
  "/login",
  [
    check("email", "Email is required!").not().isEmpty(),
    check("password", "Password is required!!").not().isEmpty(),
    validateFields,
    validateUser,
  ],
  login
);


module.exports = route