const mongoose = require("mongoose");
const Scheema = mongoose.Schema;

const taskSchema = new Scheema({
  _user: { type: Scheema.Types.ObjectId, ref: "user" },
  text: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});
const Task = mongoose.model("task", taskSchema);

exports.addTask = function (userReq, userId) {
  let newTask = new Task();

  newTask.set("text", userReq.text);
  newTask.set("_user", userId);

  return new Promise((resolve, reject) => {
    newTask.save(function (err, task) {
      if (err) {
        reject({ err });
      } else {
        resolve({ success: "Task Inserted", task });
      }
    });
  });
};

exports.getAllTasksForUser = function (userId) {
  return new Promise((resolve, reject) => {
    Task.find({ _user: userId }).exec(function (err, tasks) {
      if (err) {
        reject({ err });
      } else {
        resolve(tasks);
      }
    });
  });
};

exports.getAllTasksForUserFiltered = function (userId, search) {
  return new Promise((resolve, reject) => {
    Task.find({ _user: userId, text: { $regex: search, $options: "i" } }).exec(
      function (err, tasks) {
        if (err) {
          reject({ err });
        } else {
          resolve(tasks);
        }
      }
    );
  });
};

exports.deleteTask = function (taskId) {
  return new Promise((resolve, reject) => {
    Task.deleteOne({ _id: taskId }).exec(function (err) {
      if (err) {
        reject({ err });
      } else {
        resolve({ message: "task was deleted" });
      }
    });
  });
};

exports.editTask = function (userReq) {
  return new Promise((resolve, reject) => {
    Task.findOneAndUpdate(
      { _id: userReq._id },
      { text: userReq.text },
      { upsert: false },
      (err, task) => {
        if (err) {
          reject({ err });
        } else {
          resolve(task);
        }
      }
    );
  });
};
