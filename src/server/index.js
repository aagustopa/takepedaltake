const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const connect = require('./database/connect');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
require('dotenv').config();

// passport config
require('./config/passport')(passport);

// // static files
// app.use(express.static('../assets'));
app.use(express.static('C:/Users/aleja/OneDrive/Documents/takepedaltake/src/assets'));
// app.use('/css', express.static(__dirname + 'assets/css'));
app.use(express.static('C:/Users/aleja/OneDrive/Documents/takepedaltake/src/js'))

// aqui digo que las vistas estan en la ruta public/views
const outsitePath = 'C:/Users/aleja/OneDrive/Documents/takepedaltake/src/public/views';
app.set('views', outsitePath);

// aqui digo que view engine(convertidor de ejs a html) lea ficheros ejs
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

connect.createConnection();

// express session middleware
// El middleware express-session almacena los datos de sesión en el servidor;
// sólo guarda el ID de sesión en la propia cookie, no los datos de sesión. 
// De forma predeterminada, utiliza el almacenamiento en memoria y no está diseñado para un entorno de producción
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
    next();
});
// los mensajes flash los usamos porque estamos redirecting (para redirijir de una pagina a otra), lo estamos guardando en la sesion
// guardando o storage in sessions

app.get('/', function(req, res) {
    res.render('home')
})

app.use('/user', require('./routes/userRoutes'));
app.use('/post', require('./routes/postRoutes'));

// 404 not found
app.get('**', (req, res) => {
    res.status(404).render('404/error');
})


app.listen(process.env.PORT, function() {
    console.log(`Example listening and working on port ${process.env.PORT}!\nhttp://localhost:3000/`)
})


// https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application-es