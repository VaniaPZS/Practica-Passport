const passport = require('passport');
const User = require('../models/User.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('working');
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);

            User.find(profile.id)
                .then(user => done(null, user))
                .catch(error => {
                    const createdUser = User.create(profile);
                    done(null, createdUser);
                })
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.find(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});