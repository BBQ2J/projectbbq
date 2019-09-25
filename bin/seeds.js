// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/EmbersPals', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "pepe",
    password: bcrypt.hashSync("pepe", bcrypt.genSaltSync(bcryptSalt)),
    email: "jesusfakerking@gmail.com",
    photo: "",
    location: "Madrid",
    interests: "Caca, culo, pedo, pis",
    bio: "Pepepepepepepepe",
    active: true
  },
  {
    username: "jesus",
    password: bcrypt.hashSync("be", bcrypt.genSaltSync(bcryptSalt)),
    email: "jesusfakerking@gmail.com",
    photo: "",
    location: "Madrid",
    interests: "Mandalas y hermanos",
    bio: "Chico joven y proactivo deseando pegarse un tiro :)",
    active: true
  },
  {
    username: "manzanita",
    password: bcrypt.hashSync("no", bcrypt.genSaltSync(bcryptSalt)),
    email: "jesusfakerking@gmail.com",
    photo: "",
    location: "Barcelona",
    interests: "Bubble Teas, amigo de mis amigos, álgebra avanzada.",
    bio: "Manzana Golden fuerte e independiente con muchas ganas de oxidarse con gente nueva e interesante.",
    active: true
  }
]

const events = {
    title: String,
    content: String,
    date: { type: Date, min: Date.now },
    location: String,
    creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
    picName: String,
    picPath: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  },
    {
      title: String,
      content: String,
      date: { type: Date, min: Date.now },
      location: String,
      creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
      picName: String,
      picPath: String,
      comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    }
};

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})