const router = require("express").Router();
const upload = require("./../config/cloudinary.config");
const access = require("./../middlewares/access.mid");
const User = require("../models/User");

router.get("/:username", access.checkLogin, (req, res, next) => {
  res.render("profile/profileID");
});

// router.post()

module.exports = router;
