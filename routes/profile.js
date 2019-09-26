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

router.post("/:username/editProfile", [access.checkLogin, upload.single("userPhoto")], (req, res, next) => {
  const { name, surname, username, bio, location, age, userPhoto } = req.body;
  let { url } = req.file || "" ;
console.log(req.body.userPhoto, req.file, req.user.photo)
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name, surname, username, bio, location, age, userPhoto, photo: url },
    { new: true }
  )
    .then(updatedUser => {
      res.redirect(`/profile/${req.user.username}`);
    })
    .catch(err => {
      console.log(err);
    });

  User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        res.render("profile/editProfile", { message: "The username already exists" });
        return;
      }
    })
});

// router.post()

module.exports = router;