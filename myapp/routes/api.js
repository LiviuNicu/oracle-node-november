const express = require("express");
const router = express.Router();
const JWT = require("../middleware/jwt");

const authController = require("../controllers/authController");
const usersController = require("../controllers/userController");
//public
router.post("/auth/login", authController.loginAPI); // /api/auth/login
router.post("/auth/register", authController.registerAPI); // /api/auth/register
//private
router.get("/tasks", JWT.checkTokenAPI, usersController.getAllTasksForUserAPI); // /api/tasks
router.post("/addTask", JWT.checkTokenAPI, usersController.addTaskAPI); // /api/addTask
router.post("/editTask", JWT.checkTokenAPI, usersController.editTaskAPI); // /api/editTask
router.post("/deleteTask", JWT.checkTokenAPI, usersController.deleteTaskAPI); // /api/deleteTask
router.get("/users", JWT.checkTokenAPI, usersController.getAllUsersAPI); // /api/users

module.exports = router;
