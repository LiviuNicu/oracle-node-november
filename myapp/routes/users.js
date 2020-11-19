var express = require("express");
var router = express.Router();
const JWT = require("../middleware/jwt");
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:user", JWT.checkToken, userController.getAllUsers);
router.get("/profile/:user", JWT.checkToken, userController.getUserProfile);
//Tasks
router.get("/tasks/:user", JWT.checkToken, userController.getAllTasksForUser);
router.post("/addTask", JWT.checkToken, userController.addTask);
router.post("/editTask", JWT.checkToken, userController.editTask);
router.post("/deleteTask", JWT.checkToken, userController.deleteTask);
//Profile
router.post("/upload", JWT.checkToken, userController.upload);

module.exports = router;
