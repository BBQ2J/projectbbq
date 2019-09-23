const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.use("/posts", require("./post.routes"));

router.use("/profile", require("./profile"));

module.exports = router;
