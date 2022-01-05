const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controller");
const { validateFields,validateUser } = require("../middlewares");


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