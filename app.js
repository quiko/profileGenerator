const express =require('express');
const app = express();
var authRoutes  = require('./routes/auth');
var profilRouter = require('./routes/profile');
const passportSetup = require ('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession =require('cookie-session');
const passport =require('passport');

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true },()=>{
    console.log('connected to db')
})

app.get('/',(req,res)=>{
    res.render('home', {user: req.user})
});
app.use('/auth',authRoutes);
app.use('/profile', profilRouter)



app.listen(5000,()=>{
 console.log('listening on port 5000')
})