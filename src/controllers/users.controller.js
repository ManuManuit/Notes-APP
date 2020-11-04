const usersCtrl = {};

const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSignUpForm = (req,res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req,res) => {
    const errors = [];

    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: "Passwords do not match"});
        console.log("Passwords do not match");
    }
    if (password.length < 4) {
        errors.push({text: "Passwords must be at least 4 characters"});
        console.log("Passwords must be at least 4 characters");
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors, 
            name, 
            email,
            password,
            confirm_password
        })
    }else{
       const emailUser = await User.findOne({email: email});
        if (emailUser) {
            console.log("Email already exists");
            res.redirect('users/signup');
        }else{
            const newUser = new User ({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.redirect('/users/signin');
            console.log('Usuario registrado correctamente: ' + req.body);
        }

    }
};

usersCtrl.renderSignInForm = (req,res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes'
});

usersCtrl.logout = (req,res) => {
    req.logout();
    res.redirect('/users/signin');
};

module.exports = usersCtrl;