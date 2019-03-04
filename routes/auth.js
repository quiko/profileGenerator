const authRouter = require('express').Router();
const passport = require('passport');

//auth login
authRouter.get('/login', (req,res) =>{
    res.render('login', {user: req.user})
    ;
});
//auth log out 
authRouter.get('/logout',(req,res)=>{
    //handle with passport
    req.logout();
    res.redirect('/');
});
//auth with linkedin
authRouter.get('/linkedin',passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_basicprofile'],
}));
//callback for linkedin to redirect to
//passport use code to get profile info
authRouter.get('/linkedin/redirect',passport.authenticate('linkedin'), (req,res)=>{
    //res.send(req.user)
    res.redirect('/profile/')
})

module.exports = authRouter;