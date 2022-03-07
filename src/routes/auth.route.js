const router = require('express').Router();
const {
    get
} = require('express/lib/response');
const passport = require('passport');
// path: auth/

// GET /login
router.get('/login', (request, response) => {
    response.redirect('../public/html/login.html');
});

// GET /google/login
router.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// GET /google/callback
router.get('/google/callback', passport.authenticate('google'), (request, response) => {
    console.log(request.query.code);
    response.redirect('/');
})

// GET /verifyLogin
router.get('/verifyLogin', (request, response) => {
    if(request.user){
        response.status(200).send('Logged In');
    }else{
        response.status(401).send('Not Authorized');
    }
})

// GET /logout
router.get('/logout', (request, response) => {
    request.logOut();
    request.session = null;
    response.redirect('../public/html/home.html')
})

module.exports = router;