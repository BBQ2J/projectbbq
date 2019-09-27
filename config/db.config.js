require('dotenv').config();
const mongoose     = require('mongoose');

mongoose
  .connect(`${process.env.DB_GLOBAL}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });