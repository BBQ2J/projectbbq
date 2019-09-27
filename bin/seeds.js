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
    name: "Carlos Miguel",
    surname: "Trujillo Samper",
    username: "carlos",
    password: bcrypt.hashSync("carlos", bcrypt.genSaltSync(bcryptSalt)),
    email: "carlosdj_69@vengahijo.com",
    photo: "https://res.cloudinary.com/dq8yw5qca/image/upload/v1569425858/EmbersPals/g6wvq3diciursd1doijm.gif",
    location: "Quevedohood",
    age: 32,
    // interests: "",
    bio: "Me gusta pinchar (discos) y beber mucha agua principalmente",
    active: true
  },
  {
    name: "Luca",
    surname: "Manfredi",
    username: "luca",
    password: bcrypt.hashSync("luca", bcrypt.genSaltSync(bcryptSalt)),
    email: "luca@porcodio.com",
    photo: "https://res.cloudinary.com/dq8yw5qca/image/upload/v1569430310/EmbersPals/ezgif-3-53492a4ca1ba_vda6lp.jpg",
    location: "Indra",
    age: 30,
    // interests: "Mandalas y hermanos",
    bio: "Me gusta el Chesese y el htmmmmmeeele. El secreto esta en la masa :)",
    active: true
  },
  {
    name: "Alfonso",
    surname: "Martínez Rodera",
    username: "sito",
    password: bcrypt.hashSync("sito", bcrypt.genSaltSync(bcryptSalt)),
    email: "luca@porcodio.com",
    photo: "https://res.cloudinary.com/dq8yw5qca/image/upload/v1569429708/EmbersPals/ezgif-3-d5e515bf037f_g1aixe.jpg",
    location: "Discoteca Coco-Loco",
    age: 34,
    // interests: "Mandalas y hermanos",
    bio: "Mi pasión es el macramé los sábados noche",
    active: true
  },
  {
    name: "Ana",
    surname: "Medrano Esteban",
    username: "ana",
    password: bcrypt.hashSync("ana", bcrypt.genSaltSync(bcryptSalt)),
    email: "ana@email.com",
    photo: "https://res.cloudinary.com/dq8yw5qca/image/upload/v1569429708/EmbersPals/ezgif-3-25bcb6fb2ac3_ymakyo.jpg",
    location: "Legazpi (Madrid)",
    age: 31,
    // interests: "Mandalas y hermanos",
    bio: "No hay que perder la tradicion de la merienda",
    active: true
  },
  {
    name: "Eva",
    surname: "Molina Sarandonga",
    username: "eva",
    password: bcrypt.hashSync("eva", bcrypt.genSaltSync(bcryptSalt)),
    email: "eva@email.com",
    photo: "https://res.cloudinary.com/dq8yw5qca/image/upload/v1569429708/EmbersPals/ezgif-3-4abc83d93f95_egc3wd.jpg",
    location: "Las Tablas (Madrid)",
    age: 28,
    // interests: "Mandalas y hermanos",
    bio: "No hay que perder la tradicion de la merienda",
    active: true
  },
  {
    name: "Noa",
    surname: "Pulido Parra",
    username: "noa",
    password: bcrypt.hashSync("noa", bcrypt.genSaltSync(bcryptSalt)),
    email: "noa@email.com",
    photo: "https://res.cloudinary.com/dq8yw5qca/image/upload/v1569429708/EmbersPals/ezgif-3-0c4d3159ad59_qjynp2.jpg",
    location: "Usera (Madrid)",
    age: 27,
    // interests: "Mandalas y hermanos",
    bio: "Hija de Giorgi Dann 😉",
    active: true
  }
]

// const events = {
//     title: String,
//     content: String,
//     date: { type: Date, min: Date.now },
//     location: String,
//     creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
//     picName: String,
//     picPath: String,
//     comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
//   },
//     {
//       title: String,
//       content: String,
//       date: { type: Date, min: Date.now },
//       location: String,
//       creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
//       picName: String,
//       picPath: String,
//       comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
//     }
// };

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