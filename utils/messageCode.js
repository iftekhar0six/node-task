const Msg = {
  // User
  NAME_REQUIRED: "Name is required",
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_INVALID: "Please enter a valid email address.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_LENGTH: "Password must be at least six characters long.",
  MOBILE_INVALID: "Please enter a valid mobile number.",
  CITY_REQUIRED: "City is required.",
  COUNTRY_REQUIRED: "Country is required.",
  USER_EMAIL_EXIST: "A user with this email already exists, please try another one.",
  USER_MOBILE_EXIST: "A user with this mobile number already exists; please try another one.",
  USER_REGISTERED: "User registered successfully.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  ADMIN_LOGIN_PANEL: "Users cannot log in to the admin panel.",
  INCORRECT_PASSWORD: "Incorrect password.",
  LOGGED_IN: "Logged in successfully.",
  ADMIN_NOT_EXIST: "Admin does not exist.",
  SUCCESS: "Success.",
  USER_NOT_EXIST: "User does not exist.",
  USER_NOT_UPDATE: "An error occurred while updating the user.",
  USER_NOT_DELETED: "An error occurred while deleting the user.",
  USER_DELETE: "User deleted successfully.",
  USER_LOGIN_PANEL: "Admins cannot log in to the user panel.",

  // Auth
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  TOKEN_REQUIRED: "Token is required.",
  TOKEN_USER_NOT_FOUND: "No user found for this token.",
  TOKEN_EXPIRED: "Token has expired.",
  INVALID_TOKEN: "Invalid token provided.",
  ID_REQUIRED: "ID is required.",
  INVALID_ID: "Please enter a valid ID.",
};

module.exports = { Msg };
