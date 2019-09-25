const router = require("express").Router();
const upload = require("../config/cloudinary.config");
const access = require("../middlewares/access.mid");
const Event = require("../models/Event");
const Comment = require("../models/Comment");

router.get("/", access.checkLogin, (req, res, next) => {
  Event.find()
    .populate("creatorId")
    .then(events => {
      res.render("events/index", { events });
    });
});

router.get("/new", access.checkLogin, (req, res, next) => {
  if (req.query.error) {
    res.render("events/newevent", { message: "Please fill all the fields" });
    return;
  }

  res.render("events/newevent");
});

router.post(
  "/new",
  [access.checkLogin, upload.single("picName")],
  (req, res, next) => {
    let { title, content } = req.body;

    if (!content || !title || !req.file) {
      res.redirect("/events/new?error=empty-fields");
      return;
    }

    let { originalname } = req.file;
    let { url } = req.file || "";
    Event.create({
      title,
      content,
      picName: originalname,
      picPath: url,
      creatorId: req.user._id
    })
      .then(newEvent => {
        res.redirect("/events");
      })
      .catch(error => {
        console.log(error);
      });
  }
);

router.post(
  "/:eventid/newComment",
  [access.checkLogin, upload.single("picName")],
  (req, res, next) => {
    let { content } = req.body;
    let { eventid } = req.params;
    if (!content) {
      res.redirect("/events/newComment?error=empty-fields");
      return;
    }
    let originalname = null;
    let url = null;
    if (req.file) {
      originalname = req.file.originalname;
      url = req.file.url;
    }
    Comment.create({
      content,
      picName: originalname,
      picPath: url,
      authorId: req.user._id
    })
      .then(newComment => {
        console.log(newComment);
        Event.findByIdAndUpdate(eventid, {
          $push: { comments: newComment._id }
        }).then(commentAdded => {
          res.redirect(`/events/${eventid}`);
          return;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
);

router.get("/:id", access.checkLogin, (req, res, next) => {
  Event.findById(req.params.id)
    .populate("creatorId")
    .populate({ path: "comments", populate: { path: "authorId" } })
    .then(event => {
      event.Owner = false;

      if (
        event.creatorId._id.toString() === req.session.passport.user.toString()
      ) {
        event.Owner = true;
      }

      res.render("events/event-detail", {event});
    });
});

router.get("/:id/edit", access.checkLogin, (req, res, next) =>  {
  Event.findById(req.params.id)
  .then(event => {
    res.render("events/event-edit", {event});
  })

})

router.post("/:id/edit", [access.checkLogin, upload.single("picPath")], (req, res, next) => {
  const { id } = req.params;
  const { title, content, date, location } = req.body;
  const { url } = req.file || "";
  console.log(id, title, content, url)
  Event.findByIdAndUpdate(id, { title, content, date, location, picPath: url }, { new: true })
    .then(updatedEvent => {
      console.log(updatedEvent)
      res.redirect(`/events/${id}`);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id/delete', (req, res, next) => {
	Event.findByIdAndRemove({ _id: req.params.id }, function(error, place) {
		if (error) {
			next(error);
		} else {
			res.redirect('/events');
		}
	});
});

router.get

module.exports = router;