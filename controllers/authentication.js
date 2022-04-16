const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../module/UserModel").User;

const JWTSECRET = "super3ecr1tSec11et123152354";

const loginHelper = (userOBJ, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, userOBJ.hash).then((isMatch) => {
      if (!isMatch) return reject(`Username taken or Invialid password`);
      return jsonwebtoken.sign(
        { id: userOBJ.id },
        JWTSECRET,
        { expiresIn: "365 days" },
        (err, jwt) => {
          if (err) return reject("please try again in a bit...");
          resolve({
            id: userOBJ.id,
            username: userOBJ.username,
            jwt,
          });
        }
      );
    });
  });
};
const registerHelper = (username, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash(password, salt).then((hash) => {
        console.log(username);
        const newUser = new User({
          _id: mongoose.Types.ObjectId(),
          username,
          hash,
        });
        newUser.save().then((user) => {
          jsonwebtoken.sign(
            { id: user.id },
            JWTSECRET,
            {
              expiresIn: 3600 * 24 * 30,
            },
            (err, jwt) => {
              resolve({
                user: {
                  username: user.username,
                  id: user._id,
                },
                jwt,
              });
            }
          );
        });
      });
    });
  });
};

module.exports.ProveIdentety = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("Please enter all fields...");
  }
  User.findOne({ username }, (err, user) => {
    if (err) return res.status(404).send(err);
    if (user) {
      return loginHelper(user, password)
        .then((response) => res.json(response))
        .catch((err) => {
          res.status(404).json(err);
        });
    }
    return registerHelper(username, password)
      .then((response) => res.json(response))
      .catch(() => {
        res.status(404).json("something went Wrong please try again later");
      });
  });
};

module.exports.getUserRequest = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) return res.status(400).json(`could not find a user`);
    res.send({ username: user.username, id: user._id, cart: user.cart });
  });
};
