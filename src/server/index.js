const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const connect = require('./database/connect');
require('dotenv').config();

// // static files
app.use(express.static('../assets'));
// app.use('/css', express.static(__dirname + 'assets/css'));

// aqui digo que las vistas estan en la ruta public/views
app.set('views', '../public/views');
// aqui digo que view engine(convertidor de ejs a html) lea ficheros ejs
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect.createConnection();

app.get('/', function(req, res) {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    }, {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description 2'
    }]
    res.render('index', { articles: articles, text: 'hola' });
})

app.use('/api/v1/user', require('../server/routes/userRoutes'));

app.listen(process.env.PORT, function() {
    console.log(`Example listening and working on port ${process.env.PORT}!`)
})