const mongoose     = require('mongoose');

mongoose
<<<<<<< HEAD
  .connect('mongodb://localhost/EmbersPals', {useNewUrlParser: true, useUnifiedTopology: true })
=======
  .connect('mongodb://localhost/EmbersPals', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
>>>>>>> socialLogins
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });