const router = require("express").Router();
const upload = require("../config/cloudinary.config");
const access = require("../middlewares/access.mid");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const moment = require("moment")

router.get("/", access.checkLogin, (req, res, next) => {
  Event.find()
    .populate("creatorId")
    .then(events => {
          events.date = moment(events.date).format("DD/MM/YYYY, h:mm a")
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
    let { title, date, content, address, locality, city, postalcode, state } = req.body;

    if (!content || !title) {
      res.redirect("/events/new?error=empty-fields");
      return;
    }

    let { url } = req.file || "";
    Event.create({
      title,
      date,
      address,
      locality,
      city,
      postalcode,
      state,
      content,
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

router.get("/:id", access.checkLogin, (req, res, next) => {
  const user= req.user;
  Event.findById(req.params.id)
    .populate("creatorId")
    .populate({ path: "comments", populate: { path: "authorId" } })
    .lean()
    .then(event => {
      event.Owner = false;
      event.date = moment(event.date).format("DD/MM/YYYY")
    
      if (event.creatorId._id.toString() === req.session.passport.user.toString()) {
        event.Owner = true;
      }
      
      res.render("events/event-detail", {event, user});
    });
});

router.get("/:id/edit", access.checkLogin, (req, res, next) =>  {
  Event.findById(req.params.id)
  .then(event => {
    event.date = moment(event.date).format("DD/MM/YYYY, h:mm a")
    res.render("events/event-edit", {event});
  })
})

router.post("/:id/edit", [access.checkLogin, upload.single("picPath")], (req, res, next) => {
  const { id } = req.params;
  const { title, content, date, address, locality, city, postalcode, state } = req.body;
  const url = !!req.file? req.file.url : req.body.photo; 
   
 
  Event.findByIdAndUpdate(id, { title, content, address, locality, city, postalcode, state, date, picPath: url }, { new: true })
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