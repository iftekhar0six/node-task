"use strict";

const userRepo = require("../dataService/user");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

require("dotenv").config();

module.exports = {
  /**
   * function to create Admin
   *
   * @param {string} req.body.name - The User's name.
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @param {number} req.body.phone - The User's mobile number.
   * @param {string} req.body.city - The User's city.
   * @param {string} req.body.country - The User's country.
   * @returns {object} the details of create user
   */
  signUp: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }

      const detail = {
        role: 2,
        name: req.body.name,
        email: req.body.email,
        password: await service.bcryptPassword(req.body.password),
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
      };

      const isEmailExist = await userRepo.getDetail({ email: detail.email });
      if (isEmailExist) {
        return res.send(service.prepareResponse(HttpStatus.ALREADY_EXIST, Msg.USER_EMAIL_EXIST));
      }
      const isMobileExist = await userRepo.getDetail({ phone: detail.phone });
      if (isMobileExist) {
        return res.send(service.prepareResponse(HttpStatus.ALREADY_EXIST, Msg.USER_MOBILE_EXIST));
      }

      const newUser = await userRepo.create(detail);

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.USER_REGISTERED, {
          id: newUser.id,
        })
      );
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function for logging in admin by email and password
   *
   * @param {string} req.body.email - The Admin's email address.
   * @param {string} req.body.password - The Admin's password.
   * @returns {object} the admin login details
   */
  login: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        email: req.body.email,
        password: req.body.password,
      };

      const isAdminExist = await userRepo.getDetail({ email: detail.email });
      if (!isAdminExist) {
        return res.send(service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.INVALID_CREDENTIALS));
      }

      if (isAdminExist.type === 1) {
        return res.send(service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.ADMIN_LOGIN_PANEL));
      }

      const isMatched = await service.comparePassword(detail.password, isAdminExist.password);
      if (!isMatched) {
        return res.send(service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.INCORRECT_PASSWORD));
      }
      const token = service.generateToken(isAdminExist);
      return res.send(service.prepareResponse(HttpStatus.SUCCESS, Msg.LOGGED_IN, token));
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to find admin
   *
   * @param {string} req.user.id - The Admin's Id.
   * @returns {object} the admin details
   */
  adminDetail: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.user.id;
      const isAdmin = await userRepo.getDetailById(userId);

      if (!isAdmin) {
        return res.send(service.prepareResponse(HttpStatus.NOT_FOUND, Msg.ADMIN_NOT_EXIST));
      }

      const response = {
        details: isAdmin,
      };

      return res.send(service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, response));
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to get users list, search functionality added
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.perPage - Users per page.
   * @param {string} req.query.name - The search name.
   * @param {string} req.query.email - The search email.
   * @param {string} req.query.country - The search country.
   * @returns {object} the users list
   */
  listUser: async function (req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.perPage) || 20;
      const searchName = req.query.name || "";
      const searchEmail = req.query.email || "";
      const searchCountry = req.query.country || "";

      const { listUser, totalUsers, totalPages } = await userRepo.list(searchName, searchEmail, searchCountry, page, limit);

      const response = {
        totalUsers: totalUsers,
        totalPages: totalPages,
        searchName: searchName,
        searchEmail: searchEmail,
        searchCountry: searchCountry,
        perPage: limit,
        listUser: listUser,
      };

      return res.send(service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, response));
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to update an admin
   *
   * @param {string} req.body.name - The User's name.
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @param {number} req.body.phone - The User's mobile number.
   * @param {string} req.body.city - The User's city.
   * @param {string} req.body.country - The User's country.
   * @returns {object} the details of update Admin
   */

  updateProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }

      const userId = req.user.id;
      const isAdmin = await userRepo.getDetail({ _id: userId });
      if (!isAdmin) {
        return res.send(service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST));
      }

      const detail = {};

      if (req.body.name) {
        detail.name = req.body.name;
      }
      if (req.body.email) {
        detail.email = req.body.email;
      }
      if (req.body.phone) {
        detail.phone = req.body.phone;
      }
      if (req.body.city) {
        detail.city = req.body.city;
      }
      if (req.body.country) {
        detail.country = req.body.country;
      }
      if (req.body.password) {
        detail.password = await service.bcryptPassword(req.body.password);
      }

      if (detail.email) {
        const isEmailExist = await userRepo.getDetail({ email: detail.email });
        if (isEmailExist) {
          return res.send(service.prepareResponse(HttpStatus.ALREADY_EXIST, Msg.USER_EMAIL_EXIST));
        }
      }

      if (detail.phone) {
        const isMobileExist = await userRepo.getDetail({ phone: detail.phone });
        if (isMobileExist) {
          return res.send(service.prepareResponse(HttpStatus.ALREADY_EXIST, Msg.USER_MOBILE_EXIST));
        }
      }

      const updateAdmin = await userRepo.update(userId, detail);
      if (!updateAdmin) {
        return res.send(service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_UPDATE));
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: updateAdmin.id,
        })
      );
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to deactivate admin account
   *
   * @param {string} req.user.id - The Admin's id.
   * @returns {object} the details of deleted admin
   */
  deactivateAccount: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const adminId = req.user.id;
      const isAdmin = await userRepo.getDetail({ _id: adminId });
      if (!isAdmin) {
        return res.send(service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST));
      }

      const deletedAdmin = await userRepo.deleteUser(adminId);
      if (!deletedAdmin) {
        return res.send(service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_DELETED));
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.USER_DELETE, {
          id: deletedAdmin.id,
        })
      );
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to get user detail id
   *
   * @param {string} req.params.id - The User's id.
   * @returns {object} the details of user
   */
  detailUserById: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.params.id;
      const isUser = await userRepo.getDetailById({ _id: userId });
      if (!isUser) {
        return res.send(service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST));
      }
      const response = {
        userDetail: isUser,
      };
      return res.send(service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, response));
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },
};
