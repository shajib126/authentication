const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }
    token = token.split(" ")[1];
    const decode = jwt.verify(token, process.env.SEC_KEY);
    const user = User.findById(decode._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    req.user = user
    next()
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = authenticate