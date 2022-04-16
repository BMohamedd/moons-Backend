const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  price: { type: String, required: true },
  product: { type: String, required: true },
  size: { type: String, required: true },
  type: { type: String, required: true },
  uuid: { type: String, required: true, unique: true },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  cart: { type: [cartSchema] },
});

exports.User = mongoose.model("User", UserSchema);
