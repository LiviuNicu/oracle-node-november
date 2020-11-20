const userModelFunctions = require("../models/userModel");
const taskModelFunctions = require("../models/taskModel");

const mongoose = require("mongoose");

describe("Task model test", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://demo:demo@cluster0.nvhvm.mongodb.net/jest?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      }
    );
  });

  test("add new task for user working as expected", async () => {
    const allUsers = await userModelFunctions.getAllUsers();
    const user = await userModelFunctions.getUserById(allUsers[0]._id);
    expect(user._id).toBeDefined();
    const validTask = {
      text: "Some text",
    };
    const insertedTask = await taskModelFunctions.addTask(validTask, user._id);

    expect(insertedTask.success).toBe("Task Inserted");
    expect(insertedTask.task._id).toBeDefined();
    expect(insertedTask.task.dateAdded).toBeDefined();
    expect(insertedTask.task.text).toBe(validTask.text);
    expect(insertedTask.task._user).toBe(user._id);
  });

  test("is get all tasks for an user works as expected?", async () => {
    const allUsers = await userModelFunctions.getAllUsers();
    const user = await userModelFunctions.getUserById(allUsers[0]._id);
    expect(user._id).toBeDefined();

    const allTasksForUser = await taskModelFunctions.getAllTasksForUser(
      user._id
    );
    expect(allTasksForUser.length).toBeDefined();
  });

  test("is edit task work as expected?", async () => {
    const allUsers = await userModelFunctions.getAllUsers();
    const user = await userModelFunctions.getUserById(allUsers[0]._id);
    expect(user._id).toBeDefined();

    const allTasksForUser = await taskModelFunctions.getAllTasksForUser(
      user._id
    );

    let task = allTasksForUser[0];
    task.text = "Some other text";

    await taskModelFunctions.editTask(task);

    const allTasksAfterUpdate = await taskModelFunctions.getAllTasksForUser(
      user._id
    );

    expect(allTasksAfterUpdate[0].text).toBe("Some other text");
  });

  test("is delete task work as expected?", async () => {
    const allUsers = await userModelFunctions.getAllUsers();
    const user = await userModelFunctions.getUserById(allUsers[0]._id);
    expect(user._id).toBeDefined();

    const allTasksForUser = await taskModelFunctions.getAllTasksForUser(
      user._id
    );
    const initialLength = allTasksForUser.length;
    expect(initialLength).toBeDefined();

    let task = allTasksForUser[0];
    await taskModelFunctions.deleteTask(task._id);

    const allTasksAfterDelete = await taskModelFunctions.getAllTasksForUser(
      user._id
    );

    expect(allTasksAfterDelete.length).toBe(initialLength - 1);
  });
});
