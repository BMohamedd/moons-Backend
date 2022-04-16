const jsonwebtoken = require("jsonwebtoken");
const secret = "super3ecr1tSec11et123152354";

const authMW = (req, res, next) => {
  const jwt = req.header("x-auth-token");

  if (!jwt) return res.status(401).send("Please Login or register...");
  try {
    const decoded = jsonwebtoken.verify(jwt, secret);
    req.user = decoded;
    next();
  } catch {
    (err) => {
      return res.status(400).send(err);
    };
  }
};

module.exports = authMW;
