"use strict";

const mongoose = require("mongoose");
const { role } = require("../helpers/enum");

/**
 * Schema for User Model
 */
const userSchema = new mongoose.Schema(
  {
    role: {
      type: Number,
      enum: [role.Admin, role.User],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
