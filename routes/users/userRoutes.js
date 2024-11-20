const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const controller = require("../../controllers/userController");
const { authenticateUser } = require("../../helpers/middleware");

/**
 * Router to create user
 */
router.post(
  "/signup",
  body("name").notEmpty().withMessage(Msg.NAME_REQUIRED),
  body("email").notEmpty().withMessage(Msg.EMAIL_REQUIRED).isEmail().withMessage(Msg.EMAIL_INVALID),
  body("password").notEmpty().withMessage(Msg.PASSWORD_REQUIRED).isLength({ min: 6 }).withMessage(Msg.PASSWORD_LENGTH),
  body("phone").notEmpty().withMessage(Msg.USER_MOBILE_EXIST).isLength({ min: 10, max: 12 }).withMessage(Msg.MOBILE_INVALID),
  body("city").notEmpty().withMessage(Msg.CITY_REQUIRED),
  body("country").notEmpty().withMessage(Msg.COUNTRY_REQUIRED),
  controller.userSignUp
);

/**
 * Router to login comment
 */
router.post(
  "/login",
  body("email").notEmpty().withMessage(Msg.EMAIL_REQUIRED).isEmail().withMessage(Msg.EMAIL_INVALID),
  body("password").notEmpty().withMessage(Msg.PASSWORD_REQUIRED).isLength({ min: 6 }).withMessage(Msg.PASSWORD_LENGTH),
  controller.userLogin
);

/**
 * Router to login user
 */
router.get("/profile", authenticateUser, controller.userDetail);

/**
 * Router to update user
 */
router.put(
  "/update/profile",
  body("name").optional().notEmpty().withMessage(Msg.NAME_REQUIRED),
  body("email").optional().notEmpty().withMessage(Msg.EMAIL_REQUIRED).isEmail().withMessage(Msg.EMAIL_INVALID),
  body("password").optional().notEmpty().withMessage(Msg.PASSWORD_REQUIRED).isLength({ min: 6 }).withMessage(Msg.PASSWORD_LENGTH),
  body("phone").optional().notEmpty().withMessage(Msg.USER_MOBILE_EXIST).isLength({ min: 10, max: 12 }).withMessage(Msg.MOBILE_INVALID),
  body("city").optional().notEmpty().withMessage(Msg.CITY_REQUIRED),
  body("country").optional().notEmpty().withMessage(Msg.COUNTRY_REQUIRED),
  authenticateUser,
  controller.updateProfile
);

/**
 * Router to delete user
 */
router.delete("/deactivate/account", authenticateUser, controller.deactivateAccount);

module.exports = router;
