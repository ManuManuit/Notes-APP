const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

require('../models/User');

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, async (email, password, done) => {

    //Coincide el correo del usuario
    const user = await User.findOne({email})
    if (!user) {
        return done(null, false, {message: 'Not user Found'})
    } else {
        //Validar las contraseñas de usuario
      const match =  await user.matchPassword(password);
      if (match) {
          return done(null, user);
      }else{
          return done(null, false, {message: 'Incorrect Password'});
      }
    }
        
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});