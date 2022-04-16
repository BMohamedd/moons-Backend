const express = require("express");
const router = express.Router();
const auth = require("../controllers/authentication");
const item = require("../controllers/itemsControllers");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const authMW = require("../config/middelware/authMiddleware");

// testing route

router.get("/", (req, res) => {
  res.send("its alive!");
});

// auth routes:

// login Route
router.post("/login", auth.ProveIdentety);

// get user:
router.get("/get-user", authMW, auth.getUserRequest);

// add item to database :
router.post("/add-item", authMW, item.addProduct);

// remove item from database:
router.get("/remove-item/:id", authMW, item.removeProduct);

module.exports = router;
