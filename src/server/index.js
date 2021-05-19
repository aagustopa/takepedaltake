const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const connect = require('./database/connect');
const methodOverride = require('method-override');
/*
const Post = require('./models/db/postModel');*/
// require('')
require('dotenv').config();

// // static files
// app.use(express.static('../assets'));
app.use(express.static('C:/Users/aleja/OneDrive/Documents/takepedaltake/src/assets'));
// app.use('/css', express.static(__dirname + 'assets/css'));

// aqui digo que las vistas estan en la ruta public/views
const outsitePath = 'C:/Users/aleja/OneDrive/Documents/takepedaltake/src/public/views';
app.set('views', outsitePath);

// aqui digo que view engine(convertidor de ejs a html) lea ficheros ejs
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

connect.createConnection();

// app.get('/', function(req, res) {
//     const articles = [{
//         title: 'Test Article',
//         createdAt: new Date(),
//         description: 'Test description'
//     }, {
//         title: 'Test Article 2',
//         createdAt: new Date(),
//         description: 'Test description 2'
//     }]
//     res.render('index', { articles: articles, text: 'hola' });
// })

app.get('/', function(req, res) {
    // const post = await Post.find().sort({ createdAt: 'desc' })
    // res.send('putito');
    // res.render('test', { post: post });
    res.send('putito')
})

app.use('/user', require('./routes/userRoutes'));
app.use('/post', require('./routes/postRoutes'));

app.listen(process.env.PORT, function() {
    console.log(`Example listening and working on port ${process.env.PORT}!\nhttp://localhost:3000/`)
})