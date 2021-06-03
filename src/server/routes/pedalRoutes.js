const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pedal/pedals');
});

router.get('/new', (req, res) => {
    res.render('pedal/new');
});

router.post('/create', (req, res) => {
    res.send('pedal creado');
});

module.exports = router;