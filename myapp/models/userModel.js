const mongoose = require("mongoose");
const Scheema = mongoose.Schema;
const crypto = require("crypto");
const { resolve } = require("path");

const UserSchema = new Scheema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hashed_password: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});
const user = mongoose.model("user", UserSchema);
function hashPW(pwd) {
  return crypto.createHash("sha256").update(pwd).digest("base64").toString();
}

exports.register = function (userReq) {
  let newUser = new user();

  newUser.set("email", userReq.email);
  newUser.set("hashed_password", hashPW(userReq.password));
  newUser.set("firstName", userReq.firstName);
  newUser.set("lastName", userReq.lastName);

  return new Promise((resolve, reject) => {
    newUser.save(function (err, user) {
      if (err) {
        reject({ err });
      } else {
        resolve({ success: "User inserted", user });
      }
    });
  });
};

//userReq={email:"",password:""}
exports.login = function (userReq) {
  return new Promise((resolve, reject) => {
    user.findOne({ email: userReq.email }).exec(function (err, user) {
      if (err) {
        reject({ err });
      }

      if (!user) {
        reject({ message: "User not found" });
      } else {
        if (user.hashed_password === hashPW(userReq.password.toString())) {
          resolve({ user });
        } else {
          reject({ message: "Wrong password" });
        }
      }
    });
  });
};
