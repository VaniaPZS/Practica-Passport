const router = require('express').Router();

router.get('/', (request, response) => {
    if(request.user){
        console.log(request.user)
        response.redirect('../public/html/profile.html'); 
    }else{
        response.redirect('../public/html/login.html'); 
}});

router.get('/user', (request, response) => {
    response.send(request.user);
});

module.exports = router;