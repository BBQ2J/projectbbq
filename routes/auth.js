require("dotenv").config();

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const upload = require("./../config/cloudinary.config");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const access = require("./../middlewares/access.mid");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.EMAIL_ADDRESS}`,
    pass: `${process.env.EMAIL_PASSWORD}`
  }
});

router.get("/login", (req, res, next) => {
  if (req.query.error) {
    res.render("auth/login", {
      message: "Account not activated. Please check your email."
    });
  } else {
    res.render("auth/login", { message: req.flash("error") });
  }
});

router.post("/login", [
  access.checkUserStatus,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
]);

router.get("/signup", (req, res, next) => {
  if (req.query.error) {
    res.render("auth/signup", { message: "User not found" });
  } else {
    res.render("auth/signup");
  }
});

router.post("/signup", upload.single("userPhoto"), (req, res, next) => {
  const { name, surname, username, password, email, bio, location } = req.body;
  const { url } = req.file || "";

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const validationCode = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      username,
      password: hashPass,
      email,
      name,
      surname,
      photo: url,
      bio,
      location,
      validationCode
    });
    console.log(newUser);
    newUser.save().then(newUser => {
      transporter
        .sendMail({
          from: "info@info.com",
          to: email,
          subject: `${username} welcome! :)`,
          // html: `<a href="mongodb://localhost/EmbersPals/auth/confirm/${validationCode}">Click here to activate your account</a>`
          html: `<a href="mongodb+srv://emberspals:lCXneY50pEbfTF5R@cluster0-8ecr6.mongodb.net/embers-global?retryWrites=true&w=majority/auth/confirm/${validationCode}">Click here to activate your account</a>`
          // html: `<a href="${process.env.DB_GLOBAL}/auth/confirm/${validationCode}">Click here to activate your account</a>`

        })
        .then(() => res.redirect("/"))
        .catch(err => {
          console.log(err);
        })
        .catch(err => {
          console.log(err);
          res.render("auth/signup", { message: "Something went wrong" });
        });
    });
  });
});

// router.get("/");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/events",
    failureRedirect: "/login" // here you would redirect to the login page using traditional login approach
  })
);

router.get("/facebook", passport.authenticate("facebook", {
  scope: ['email']
}));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/events",
    failureRedirect: "/login"
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/confirm/:token", (req, res) => {
  User.updateOne(
    { validationCode: req.params.token },
    { active: true },
    { new: true }
  ).then(userUpdated => {
    if (userUpdated) {
      res.render("auth/activation", { user: true });
      return;
    } else {
      res.render("auth/activation", { error: true });
      return;
    }
  });
});

module.exports = router;
