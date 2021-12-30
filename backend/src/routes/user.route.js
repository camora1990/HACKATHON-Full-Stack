const { Router } = require("express");
const { createUser, listUser, deleteUser } = require("../controller");
const { check, header } = require("express-validator");
const { validateExsitingEmail } = require("../helpers");
const { validateFields } = require("../middlewares");
const {
  validateJWT,
  validateUser,
  validateAdmin,
} = require("../middlewares/validations");

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
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "i"
      )
      .withMessage(
        "The password must contain a minimum of 8 characters, uppercase, lowercase and numbers"
      ),
    validateFields,
  ],
  createUser
);

route.get(
  "/",
  [
    header("authorization", "Unauthorization user").notEmpty(),
    validateFields,
    validateJWT,
    validateUser,
    validateAdmin,
  ],
  listUser
);

route.delete(
  "/delete-user/:id",
  [
    check("id", "It is not a valid mongo id").isMongoId(),
    header("authorization", "Unauthorization user").notEmpty(),
    validateFields,
    validateJWT,
    validateUser,
    validateAdmin,
  ],
  deleteUser
);

module.exports = route;
