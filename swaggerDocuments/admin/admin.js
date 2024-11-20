/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Admin registration
 *     tags: [Admin side API]
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
 *                 example: admin@tom.com
 *               password:
 *                 type: string
 *                 example: abc123
 *               phone:
 *                 type: string
 *                 example: 9425611586
 *               city:
 *                 type: string
 *                 example: Las Vegas
 *               country:
 *                 type: string
 *                 example: USA
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
 *                   example: 500
 *                 responseMessage:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin side API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@tom.com
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
 * /admin/detail:
 *   get:
 *     summary: Admin profile
 *     tags: [Admin side API]
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
 *                     details:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 673d88cbd2c8c098ab6b4e6f
 *                         name:
 *                           type: string
 *                           example: tom
 *                         email:
 *                           type: string
 *                           example: admin@tom.com
 *                         phone:
 *                           type: string
 *                           example: 9425611586
 *                         city:
 *                           type: string
 *                           example: delhi
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
 * /admin/list:
 *   get:
 *     summary: List of users
 *     tags: [Admin side API]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search name for filtering admins
 *         example: tom
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Search email for filtering admins
 *         example: tom@admin.com
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Search country for filtering admins
 *         example: india
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Number of admins to return per page
 *         example: 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
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
 *                     totalUsers:
 *                       type: integer
 *                       example: 5
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     searchName:
 *                       type: string
 *                       example: "tom"
 *                     searchEmail:
 *                       type: string
 *                       example: "tom@user.com"
 *                     searchCountry:
 *                       type: string
 *                       example: "india"
 *                     perPage:
 *                       type: integer
 *                       example: 20
 *                     listUser:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 673d7252b3f7b3b841f70f9d
 *                           name:
 *                             type: string
 *                             example: Admin
 *                           email:
 *                             type: string
 *                             example: admin@hj.com
 *                           phone:
 *                             type: integer
 *                             example: 9897899878
 *                           city:
 *                             type: string
 *                             example: mumbai
 *                           country:
 *                             type: string
 *                             example: india
 *       500:
 *         description: Failed
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
 * /admin/update/profile:
 *   put:
 *     summary: Update profile
 *     tags: [Admin side API]
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
 *                 example: Password
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
 * /admin/delete/account:
 *   delete:
 *     summary: Deactivate account
 *     tags: [Admin side API]
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
 *                   example: User deleted
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

/**
 * @swagger
 * /admin/user/{id}:
 *   get:
 *     summary: Get user detail by id
 *     tags: [Admin side API]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoID of the User
 *         schema:
 *           type: string
 *           example: 66acb05e066a0832ccee4a4a
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
 *                     userDetail:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 673d83148651050de279b8e2
 *                         name:
 *                           type: string
 *                           example: Tom
 *                         email:
 *                           type: string
 *                           example: email@tom.com
 *                         phone:
 *                           type: string
 *                           example: 8485755696
 *                         city:
 *                           type: string
 *                           example: mumbai
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
