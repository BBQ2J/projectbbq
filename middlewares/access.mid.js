const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const User = require("./../models/User")
module.exports.checkUserStatus = (req, res, next) => {
  const {username} = req.body;
  User.findOne({username})
  .then(userFound => {
    if (userFound) {
      if (userFound.active) {
        next()
      }
      else {
        res.redirect("/auth/login?error=not-activated")
      }
    }
    else {
      res.redirect("/auth/signup?error=user-not-found")
    }
  })
};

module.exports.checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
