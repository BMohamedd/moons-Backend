const User = require("../module/UserModel").User;
const mongoose = require("mongoose");

module.exports.addProduct = (req, res) => {
  User.findById(req.user.id, (error, userObject) => {
    if (error) return res.status(404).send("something went wrong...");
    userObject.cart.push(req.body[0]);
    userObject.save((err, obj) => {
      if (err) console.log("couldn't save product => ", err);
      res.json(obj.cart);
    });
  });
};

module.exports.removeProduct = (req, res) => {
  User.findById(req.user.id, (error, userObject) => {
    if (error) return res.status(404).send("something went wrong...");
    userObject.cart.map((element) => {
      if (element.uuid === req.params.id) {
        try {
          userObject.cart.id(element._id).remove();
        } catch (error) {
          console.log(error);
        }
      }
      return;
    });
    userObject.save((err) => {
      if (err) return console.log(err);
      return res.send("removal complete 💯");
    });
  });
};
