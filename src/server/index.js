const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.get('/', function(req, res) {
    res.send('Hola mundo');
})

app.use('/api/v1/user', require('../server/routes/userRoutes'));

app.listen(3000, function() {
    console.log('Example listening on port 3000 working!')
})