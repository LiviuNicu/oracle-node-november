const jwt = require("jsonwebtoken");
var JWT_PRIVATE_KEY = "Oracle";

exports.getToken = (obj) => {
  return jwt.sign(obj, JWT_PRIVATE_KEY, { expiresIn: "8h" });
};

exports.checkToken = (req, res, next) => {
  try {
    const token = req.cookies["x-auth"];
    const decode = jwt.verify(token, JWT_PRIVATE_KEY);
    req.userData = decode;
    next();
  } catch (err) {}
};

exports.checkTokenAPI = (req, res, next) => {
  try {
    //token : "Bearer safdasdasdasda"
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, JWT_PRIVATE_KEY);
    req.userData = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: "unauthorized" });
  }
};
