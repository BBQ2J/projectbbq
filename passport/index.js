const passport = require('passport');

require('./serializers');
require('./localStrategy');
require('../config/passport.config');

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
}