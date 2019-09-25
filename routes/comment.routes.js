const router = require("express").Router();
const upload = require("../config/cloudinary.config");
const access = require("../middlewares/access.mid");
const Event = require("../models/Event");
const Comment = require("../models/Comment");

router.post(
  "/:id/newComment",
  [access.checkLogin, upload.single("picName")],
  (req, res, next) => {
    let { content } = req.body;
    let { id } = req.params;
    if (!content) {
      res.redirect("/events/newComment?error=empty-fields");
      return;
    }

    Comment.create({
      content,
      authorId: req.user._id
    })
      .then(newComment => {
        console.log(newComment);
        Event.findByIdAndUpdate(id, {
          $push: { comments: newComment._id }
        }).then(commentAdded => {
          res.redirect(`back`);
          return;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
);

router.post("/:id/deleteComment", (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("back");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
