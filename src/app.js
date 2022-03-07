const express = require('express');
const path = require('path');
require('dotenv').config();
require('./config/passport.js');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave'] //clave para encriptar
}))
//inicializar passport
app.use(passport.initialize());
app.use(passport.session());
const auth = require('./routes/auth.route.js');
const profile = require('./routes/profile.route.js');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/auth', auth);
app.use('/profile', profile);

app.get('/', (req, res) => {
    res.redirect('./public/html/home.html');
});


module.exports = app;