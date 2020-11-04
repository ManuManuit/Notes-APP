const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

//Initializations
const app = express();
require('./config/passport');


//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, '/views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true, 
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use(express.static(path.join(__dirname, 'public')));

//Comprobar si el usuario está autenticado
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

//Static files
module.exports = app;