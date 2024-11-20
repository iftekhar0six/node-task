"use strict";

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./helpers/swaggerConnection");
require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = express();
app.use(express.json());

/**
 * Swagger UI setup
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * User router
 */
const userRouter = require("./routes/users/userRoutes");

/**
 * Admin router
 */
const adminRouter = require("./routes/admins/adminRoutes");

/**
 * database connection
 */
const { dbConnect } = require("./database/db");
global.dbConnection = dbConnect();

/**
 * Express application for handling User API routes.
 */
app.use("/api/v1", userRouter);

/**
 * Express application for handling Admin API routes.
 */
app.use("/api/admin", adminRouter);

/**
 *
 */
app.use("*", (req, res) => {
  res.status(404).json({
    message: "The requested URL does not exist.",
    documentation_url: `http://${HOST}:${PORT}/api-docs`,
  });
});

/**
 * HTTP server for the Express application.
 */
const server = http.createServer(app);

/**
 * Listens on the specified port.
 *
 * @param {number} PORT - The port number for the server.
 * @param {number} HOST - The host for the server.
 */
server.listen(PORT, HOST, () => {
  console.log("----------------------------------------------------------------");
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Click here for swagger-ui http://${HOST}:${PORT}/api-docs`);
  console.log("----------------------------------------------------------------");
});
