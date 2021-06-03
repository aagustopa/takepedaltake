const express = require('express');
const router = express.Router();
const Pedal = require('../models/db/pedalModel');

router.get('/', (req, res) => {
    res.render('pedal/pedals');
});

router.get('/new', (req, res) => {
    res.render('pedal/new');
});

router.post('/create', (req, res) => {
    const pedal = new Pedal({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        state: req.body.state,
        brand: req.body.brand,
        price: req.body.price,
        sell: req.body.sell,
        rent: req.body.rent,
    })
});

module.exports = router;