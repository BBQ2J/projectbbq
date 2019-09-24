const router = require("express").Router();
const upload = require("./../config/cloudinary.config");
const access = require("./../middlewares/access.mid");
const User = require("../models/User");

router.get("/:username", access.checkLogin, (req, res, next) => {
  res.render("profile/profileID");
});

router.get("/:username/editProfile", access.checkLogin, (req, res, next) => {
  res.render("profile/editProfile");
});

router.post("/:username/editProfile", access.checkLogin, (req, res, next) => {
  const { name, surname, username, bio, location } = req.body;
  // const { originalname, url } = req.file;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { name, surname, username, bio, location },
    { new: true }
  )
    .then(updatedUser => {
      res.redirect(`/profile/${req.user.username}`);
    })
    .catch(err => {
      console.log(err);
    });
});

// router.post()

module.exports = router;
