const profilRouter = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

profilRouter.get('/', authCheck, (req, res) => {
    res.render('profile',{user: req.user});
});

module.exports = profilRouter;