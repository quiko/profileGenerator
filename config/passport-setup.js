const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const keys = require("./keys");
const User = require("../models/user");

passport.serializeUser((user,done)=>{
  done(null,user.id)
});

passport.deserializeUser((id,done)=>{
   User.findById(id).then((user)=>{
     done(null,user)
   })
});

passport.use(
  new LinkedInStrategy(
    {
      //options
      clientID: keys.LinkedIn.clientID,
      clientSecret: keys.LinkedIn.clientSecret,
      callbackURL: "http://localhost:5000/auth/linkedin/redirect"
      //scope: ['r_emailaddress', 'r_basicprofile'],
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      //check if user already exist in db
      User.findOne({ linkedinId: profile.id }).then(currentUser => {
        //already have user
        if (currentUser) {
          done(null,currentUser)
        } else {
          //if not then create new user in db
          new User({
            linkedinId: profile.id,
            username: profile.displayName,
            occupation: profile._json.headline,
            location: profile._json.location.name,
            picture: profile._json.pictureUrl
          })
            .save()
            .then(newUser => {
              done(null, newUser)
            });
        }
      });
    }
  )
);
