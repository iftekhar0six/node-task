"use strict";

require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Options for swagger
 */
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Node-task API",
      version: "1.0.0",
      description: "API documentation for Node-task",
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: "Node Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./swaggerDocuments/admin/*.js", "./swaggerDocuments/user/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };
