const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const connect = require('./database/connect');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const initialSetup = require('./libs/initialSetup');
require('dotenv').config();


const app = express();
initialSetup.createRoles();

// passport config
require('./config/passport')(passport);

// // static files (loading css and js)
app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../js')));

// aqui digo que las vistas estan en la ruta public/views
app.set('views', path.join(__dirname, '../public/views'));

// aqui digo que view engine(convertidor de ejs a html) lea ficheros ejs
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(methodOverride('_method'));

connect.createConnection();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.role_error = req.flash('role_error');
    res.locals.user_deleted = req.flash('user_deleted');
    res.locals.user_updated = req.flash('user_updated');
    res.locals.user = req.user || null;
    next();
});

app.get('/', function(req, res) {
    res.render('home')
});

// app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/post', require('./routes/postRoutes'));
app.use('/compraventa', require('./routes/pedalRoutes'));
app.use('/demo', require('./routes/demoRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// 404 not found
app.get('**', (req, res) => {
    res.status(404).render('404/error');
});


app.listen(process.env.PORT, function() {
    console.log(`TakePedalTake web listening and working on port ${process.env.PORT}!\nhttp://localhost:3000/\n${process.env.WEB}`)
});