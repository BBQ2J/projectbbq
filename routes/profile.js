const router = require("express").Router();
const upload = require("./../config/cloudinary.config");
const access = require("./../middlewares/access.mid");
const User = require("../models/User");

router.get("/:username", access.checkLogin, (req, res, next) => {
  // User.findById(req.params.id).then(user => {
  //   res.render("profile/profileID", { user });
  // });
  res.render("profile/profileID");
});

module.exports = router;
