/**
 * @swagger
 * /v1/signup:
 *   post:
 *     summary: User registration
 *     tags: [User side API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tom
 *               email:
 *                 type: string
 *                 example: tom@user.com
 *               password:
 *                 type: string
 *                 example: abc123
 *               phone:
 *                 type: string
 *                 example: 9458511251
 *               city:
 *                 type: string
 *                 example: delhi
 *               country:
 *                 type: string
 *                 example: india
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: User registered successfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66b0c8f5cb3f10683d8688ff
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 *
 */

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: User login
 *     tags: [User side API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: tom@user.com
 *               password:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Logged in successfully
 *                 responseData:
 *                   type: string
 *                   example: The access token of admin
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 *
 */

/**
 * @swagger
 * /v1/profile:
 *   get:
 *     summary: User profile
 *     tags: [User side API]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Success.
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 673d8e68442788bfd4e5c882
 *                         name:
 *                           type: string
 *                           example: Tom
 *                         email:
 *                           type: string
 *                           example: abc@user.com
 *                         phone:
 *                           type: integer
 *                           example: 9584522333
 *                         city:
 *                           type: string
 *                           example: patan
 *                         country:
 *                           type: string
 *                           example: india
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /v1/update/profile:
 *   put:
 *     summary: Update profile
 *     tags: [User side API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tom
 *               email:
 *                 type: string
 *                 example: tom@gmail.com
 *               password:
 *                 type: string
 *                 example: tom123
 *               phone:
 *                 type: integer
 *                 example: 1234567890
 *               city:
 *                 type: string
 *                 example: delhi
 *               country:
 *                 type: string
 *                 example: india
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: Success
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66b0c8f5cb3f10683d8688ff
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /v1/deactivate/account:
 *   delete:
 *     summary: Deactivate account
 *     tags: [User side API]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: User deleted successfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66acb05e066a0832ccee4a4a
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 *                   example: Error message
 */
