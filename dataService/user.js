"use strict";

const user = require("../models/user");

/**
 * used for filtering the user collection by filter
 *
 * @param {object} filter - Filter for filtering user
 * @returns the user detail
 */
async function getDetail(filter) {
  const detail = await user.findOne(filter);
  return detail;
}

/**
 * used for creating a new user
 *
 * @param {object} userInfo - the user info
 * @returns the saved user detail
 */
async function create(userInfo) {
  const newData = new user(userInfo);
  const data = await newData.save();
  return data;
}

/**
 * function used to get detail of user by id
 *
 * @param {string} id - Id of the user
 * @returns the user detail
 */
async function getDetailById(id) {
  const detail = await user.findById(id).select("name email phone city country").exec();
  return detail;
}

/**
 * function to get list of all user and search them by name, email and country
 *
 * @param {string} name - Search name to filter user
 * @param {string} email - Search email to filter user
 * @param {string} country - Search country to filter user
 * @param {number} page - Page number
 * @returns {object} list of user
 */
async function list(name, email, country, page, limit) {
  const skip = (page - 1) * limit;

  let matchStage = { isDeleted: { $ne: true } };

  if (name) {
    matchStage.$or = [{ name: { $regex: name, $options: "i" } }];
  }

  if (email) {
    if (!matchStage.$or) matchStage.$or = [];
    matchStage.$or.push({ email: { $regex: email, $options: "i" } });
  }

  if (country) {
    matchStage.country = { $regex: country, $options: "i" };
  }

  const listUser = await user
    .aggregate([
      { $match: matchStage },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          city: 1,
          country: 1,
        },
      },
    ])
    .exec();

  const totalUsers = await user.countDocuments(matchStage);
  const totalPages = Math.ceil(totalUsers / limit);

  return { listUser, totalUsers, totalPages };
}

/**
 * function to update an user
 *
 * @param {string} userId - User's id
 * @param {object} userInfo - User detail
 * @returns {object} the updated user
 */
async function update(userId, userInfo) {
  const data = await user.findByIdAndUpdate(userId, userInfo, {
    new: true,
  });
  return data;
}

/**
 * function to delete an user profile
 *
 * @param {string} userId - User's id
 * @returns {object} the deleted user details
 */
async function deleteUser(userId) {
  const userInfo = {
    email: null,
    phone: null,
    password: null,
    isDeleted: true,
  };
  const data = await user.findByIdAndUpdate(userId, userInfo, {
    new: true,
  });

  return data;
}

module.exports = {
  getDetail: getDetail,
  create: create,
  getDetailById: getDetailById,
  list: list,
  update: update,
  deleteUser: deleteUser,
};
