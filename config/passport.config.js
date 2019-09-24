require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log("Google account details:", profile);

      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id, email: profile.emails[0].value, username: profile.displayName, active: true  })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);

passport.use(new FacebookStrategy({
    clientID: `${process.env.FACEBOOK_ID}`,
    clientSecret: `${process.env.FACEBOOK_SECRET}`,
    callbackURL: "/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // to see the structure of the data in received response:
    console.log("Facebook account details:", profile);

    User.findOne({ facebookID: profile.id })
      .then(user => {
        if (user) {
          done(null, user);
          return;
        }

        User.create({ facebookID: profile.id, email: "your@email.com", username: profile.displayName, active: true  })
          .then(newUser => {
            done(null, newUser);
          })
          .catch(err => done(err)); // closes User.create()
      })
      .catch(err => done(err)); // closes User.findOne()
  }
)
);