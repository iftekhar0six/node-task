"use strict";

const userRepo = require("../dataService/user");
const service = require("../helpers/service");
const { HttpStatus } = require("../utils/httpStatus");
const { Msg } = require("../utils/messageCode");

require("dotenv").config();

module.exports = {
  /**
   * function to create user
   *
   * @param {string} req.body.name - The User's name.
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @param {number} req.body.phone - The User's mobile number.
   * @param {string} req.body.city - The User's city.
   * @param {string} req.body.country - The User's country.
   * @returns {object} the details of create user
   */
  userSignUp: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }

      const detail = {
        role: 1,
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
        service.prepareResponse(HttpStatus.CREATED, Msg.USER_REGISTERED, {
          id: newUser.id,
        })
      );
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function for logging in user by email and password
   *
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @returns {object} the user login details
   */
  userLogin: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const detail = {
        email: req.body.email,
        password: req.body.password,
      };

      const isUserExist = await userRepo.getDetail({ email: detail.email });
      if (!isUserExist) {
        return res.send(service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.INVALID_CREDENTIALS));
      }

      if (isUserExist.type === 2) {
        return res.send(service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.USER_LOGIN_PANEL));
      }
      const isMatched = await service.comparePassword(detail.password, isUserExist.password);
      if (!isMatched) {
        return res.send(service.prepareResponse(HttpStatus.UNAUTHORIZED, Msg.INCORRECT_PASSWORD));
      }
      const token = service.generateToken(isUserExist);
      return res.send(service.prepareResponse(HttpStatus.SUCCESS, Msg.LOGGED_IN, token));
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to find user
   *
   * @param {string} req.user.id - The User's Id.
   * @returns {object} the user details
   */
  userDetail: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.user.id;
      const isUser = await userRepo.getDetailById({ _id: userId });

      if (!isUser) {
        return res.send(service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST));
      }
      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          profile: isUser,
        })
      );
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to get users list, search functionality added
   *
   * @param {number} req.query.page - Page number.
   * @param {string} req.query.perPage - Users per page.
   * @param {string} req.query.searchTerm - The search term.
   * @returns {object} the users list
   */
  listUser: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const limit = Number(req.query.perPage) || 20;
      const searchTerm = req.query.searchTerm;

      const { listUser, totalUsers, totalPages } = await userRepo.list(searchTerm, page, limit);

      const response = {
        totalUsers: totalUsers,
        totalPages: totalPages,
        searchTerm: searchTerm,
        perPage: limit,
        listUser: listUser,
      };

      return res.send(service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, response));
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to update user
   *
   * @param {string} req.body.name - The User's name.
   * @param {string} req.body.email - The User's email address.
   * @param {string} req.body.password - The User's password.
   * @param {number} req.body.phone - The User's mobile number.
   * @param {string} req.body.city - The User's city.
   * @param {string} req.body.country - The User's country.
   * @returns {object} the details of update user
   */
  updateProfile: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }

      const userId = req.user.id;
      const isUser = await userRepo.getDetail({ _id: userId });
      if (!isUser) {
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

      const updateUser = await userRepo.update(userId, detail);
      if (!updateUser) {
        return res.send(service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_UPDATE));
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.SUCCESS, {
          id: updateUser.id,
        })
      );
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * function to deactivate user account
   *
   * @param {string} req.user.id - The User's id.
   * @returns {object} the details of deleted user
   */
  deactivateAccount: async function (req, res) {
    try {
      if (service.hasValidatorErrors(req, res)) {
        return;
      }
      const userId = req.user.id;
      const isUser = await userRepo.getDetail({ _id: userId });
      if (!isUser) {
        return res.send(service.prepareResponse(HttpStatus.NOT_FOUND, Msg.USER_NOT_EXIST));
      }

      const deletedUser = await userRepo.deleteUser(userId);

      if (!deletedUser) {
        return res.send(service.prepareResponse(HttpStatus.BAD_REQUEST, Msg.USER_NOT_DELETED));
      }

      return res.send(
        service.prepareResponse(HttpStatus.SUCCESS, Msg.USER_DELETE, {
          id: deletedUser.id,
        })
      );
    } catch (error) {
      return res.send(service.prepareResponse(HttpStatus.INTERNAL_SERVER_ERROR, Msg.INTERNAL_SERVER_ERROR));
    }
  },
};
