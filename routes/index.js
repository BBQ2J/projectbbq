const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use('/auth', require('./auth'));
      
router.use("/events", require("./event.routes"));

router.use("/events", require("./comment.routes"));

router.use("/profile", require("./profile"));

module.exports = router;