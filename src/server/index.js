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
// const initialSetup = require('./libs/initialSetup');
require('dotenv').config();

// new hosting?
// https://www.atlantic.net/vps-hosting/webdevsimplified/

const app = express();
// initialSetup.createRoles();
// https://www.youtube.com/watch?v=lV7mxivGX_I minuto 1:22:55

// passport config
require('./config/passport')(passport);

// // static files (loading css and js)
app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../js')));

// aqui digo que las vistas estan en la ruta public/views
// const outsitePath = 'C:/Users/aleja/OneDrive/Documents/takepedaltake/src/public/views';
app.set('views', path.join(__dirname, '../public/views'));

// aqui digo que view engine(convertidor de ejs a html) lea ficheros ejs
// es esto mejorable??? ver video https://www.youtube.com/watch?v=-bI0diefasA minuto 20:30 y ver pagina about ejs https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application-es 
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
// otro dato: esta configuración basica nos permetirá autenticar al usuario y almacenar sus datos temporalmente
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
    res.locals.user = req.user || null;
    next();
});
// los mensajes flash los usamos porque estamos redirecting (para redirijir de una pagina a otra), lo estamos guardando en la sesion
// guardando o storage in sessions

app.get('/', function(req, res) {
    res.render('home')
});

app.use('/user', require('./routes/userRoutes'));
app.use('/post', require('./routes/postRoutes'));
app.use('/demo', require('./routes/demoRoutes'));

// 404 not found
app.get('**', (req, res) => {
    res.status(404).render('404/error');
});


app.listen(process.env.PORT, function() {
    console.log(`TakePedalTake web listening and working on port ${process.env.PORT}!\nhttp://localhost:3000/\n${process.env.WEB}`)
});


// https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application-es