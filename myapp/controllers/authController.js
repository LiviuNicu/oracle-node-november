const userModel = require("../models/userModel");

exports.login = function (req, res) {
  userModel
    .login(req.body)
    .then((response) => {
      res.redirect("/user/" + response.user._id);
    })
    .catch((err) => {
      res.render("login", { title: "Login", error: err.message });
    });
};

exports.register = async function (req, res) {
  try {
    const response = await userModel.register(req.body);
    //res.status(200).json(response);
    res.redirect("/auth/login");
  } catch (err) {}
};
