const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

// // static files
app.use(express.static('../assets'));
// app.use('/css', express.static(__dirname + 'assets/css'));

// aqui digo que las vistas estan en la ruta public/views
app.set('views', '../public/views');
// aqui digo que view engine(convertidor de ejs a html) lea ficheros ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
})

app.use('/api/v1/user', require('../server/routes/userRoutes'));

app.listen(3000, function() {
    console.log('Example listening on port 3000 working!')
})