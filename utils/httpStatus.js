const HttpStatus = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  REQUIRED: 422,
  INTERNAL_SERVER_ERROR: 500,
  ALREADY_EXIST: 409,
};

module.exports = { HttpStatus };