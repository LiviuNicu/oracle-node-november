const fs = require("fs");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");

exports.getAllUsers = async function (req, res) {
  try {
    fs.readdir("public/images", async (err, files) => {
      if (err) {
        console.log(err);
      } else {
        const allFiles = files;
        const allUsers = await userModel.getAllUsers();
        // get the id from the link
        const loggedUser = await userModel.getUserById(req.params.user);
        //get the id from the token
        //const loggedUser= await userModel.getUserById(req.userData._id);

        const users = allUsers.map((user) => {
          user.hasProfilePicture = allFiles.filter((file) => {
            return file.indexOf(user._id) !== -1;
          }).length
            ? true
            : false;
          return user;
        });

        res.render("userList", {
          title: "Users",
          allUsers: users,
          loggedUser,
        });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllUsersAPI = async function (req, res) {
  try {
    fs.readdir("public/images", async (err, files) => {
      if (err) {
        console.log(err);
      } else {
        const allFiles = files;
        const allUsers = await userModel.getAllUsers();
        // get the id from the link
        const loggedUser = await userModel.getUserById(req.userData._id);
        //get the id from the token
        //const loggedUser= await userModel.getUserById(req.userData._id);

        const users = allUsers.map((user) => {
          user.hasProfilePicture = allFiles.filter((file) => {
            return file.indexOf(user._id) !== -1;
          }).length
            ? true
            : false;
          return user;
        });
        res.status(200).json({ allUsers: users, loggedUser });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserProfile = async function (req, res) {
  try {
    const selectedUser = await userModel.getUserById(req.params.user);
    res.render("profile", { title: "User Profile", selectedUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addTask = async function (req, res) {
  try {
    await taskModel.addTask(req.body, req.body.userID);
    res.redirect("/users/tasks/" + req.body.userID);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addTaskAPI = async function (req, res) {
  try {
    const response = await taskModel.addTask(req.body, req.body.userID);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllTasksForUser = async function (req, res) {
  try {
    let allTasks = [];
    if (req.query && req.query.search) {
      allTasks = await taskModel.getAllTasksForUserFiltered(
        req.params.user,
        req.query.search
      );
    } else {
      allTasks = await taskModel.getAllTasksForUser(req.params.user);
    }

    const selectedUser = await userModel.getUserById(req.params.user);
    res.render("tasks", { title: "User tasks", allTasks, selectedUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllTasksForUserAPI = async function (req, res) {
  try {
    let allTasks = [];
    if (req.query && req.query.search) {
      allTasks = await taskModel.getAllTasksForUserFiltered(
        req.query.userID,
        req.query.search
      );
    } else {
      allTasks = await taskModel.getAllTasksForUser(req.query.userID);
    }

    const selectedUser = await userModel.getUserById(req.query.userID);
    res.status(200).json({ allTasks, selectedUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editTask = async function (req, res) {
  try {
    await taskModel.editTask(req.body);
    res.redirect("/users/tasks/" + req.body.userID);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editTaskAPI = async function (req, res) {
  try {
    const response = await taskModel.editTask(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteTask = async function (req, res) {
  try {
    await taskModel.deleteTask(req.body._id);
    res.redirect("/users/tasks/" + req.body.userID);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteTaskAPI = async function (req, res) {
  try {
    const response = await taskModel.deleteTask(req.body._id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.upload = function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were added");
  }

  let sampleFile = req.files.sampleFile;

  sampleFile.mv("public/images/" + req.body.userID + ".png", function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.redirect("/users/" + req.userData._id);
  });
};
