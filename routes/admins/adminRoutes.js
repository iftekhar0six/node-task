const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { Msg } = require("../../utils/messageCode");
const controller = require("../../controllers/adminController");
const { authenticateAdmin } = require("../../helpers/middleware");

/**
 * Router to create Admin
 */
router.post(
  "/signup",
  body("name").notEmpty().withMessage(Msg.NAME_REQUIRED),
  body("email").notEmpty().withMessage(Msg.EMAIL_REQUIRED).isEmail().withMessage(Msg.EMAIL_INVALID),
  body("password").notEmpty().withMessage(Msg.PASSWORD_REQUIRED).isLength({ min: 6 }).withMessage(Msg.PASSWORD_LENGTH),
  body("phone").notEmpty().withMessage(Msg.USER_MOBILE_EXIST).isLength({ min: 10, max: 12 }).withMessage(Msg.MOBILE_INVALID),
  body("city").notEmpty().withMessage(Msg.CITY_REQUIRED),
  body("country").notEmpty().withMessage(Msg.COUNTRY_REQUIRED),
  controller.signUp
);

/**
 * Router to login Admin
 */
router.post(
  "/login",
  body("email").notEmpty().withMessage(Msg.EMAIL_REQUIRED).isEmail().withMessage(Msg.EMAIL_INVALID),
  body("password").notEmpty().withMessage(Msg.PASSWORD_REQUIRED).isLength({ min: 6 }).withMessage(Msg.PASSWORD_LENGTH),
  controller.login
);

/**
 * Router to find Admin
 */
router.get("/detail", authenticateAdmin, controller.adminDetail);

/**
 * Router to list Admin
 */
router.get("/list", authenticateAdmin, controller.listUser);

/**
 * Router to update Admin
 */
router.put(
  "/update/profile",
  body("name").optional().notEmpty().withMessage(Msg.NAME_REQUIRED),
  body("email").optional().notEmpty().withMessage(Msg.EMAIL_REQUIRED).isEmail().withMessage(Msg.EMAIL_INVALID),
  body("password").optional().notEmpty().withMessage(Msg.PASSWORD_REQUIRED).isLength({ min: 6 }).withMessage(Msg.PASSWORD_LENGTH),
  body("phone").optional().notEmpty().withMessage(Msg.USER_MOBILE_EXIST).isLength({ min: 10, max: 12 }).withMessage(Msg.MOBILE_INVALID),
  body("city").optional().notEmpty().withMessage(Msg.CITY_REQUIRED),
  body("country").optional().notEmpty().withMessage(Msg.COUNTRY_REQUIRED),
  authenticateAdmin,
  controller.updateProfile
);
/**
 * Router to delete Admin
 */
router.delete("/delete/account", authenticateAdmin, controller.deactivateAccount);

/**
 * Router to delete User by Id from Admin
 */
router.get(
  "/user/:id",
  param("id").notEmpty().withMessage(Msg.ID_REQUIRED).isMongoId().withMessage(Msg.INVALID_ID),
  authenticateAdmin,
  controller.detailUserById
);

module.exports = router;
