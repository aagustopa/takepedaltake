const express = require('express');
const router = express.Router();
const Pedal = require('../models/db/pedalModel');
const imageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];


router.get('/', (req, res) => {
    res.render('pedal/pedals');
});

router.get('/all', async(req, res) => {
    // const pedal = await Pedal.find().sort({ createdAt: 'desc' });
    try {
        const pedals = await Pedal.find({});
        res.render('pedal/all', {
            pedals: pedals,
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('pedal/new', { pedal: new Pedal() });
});

router.post('/create', async(req, res) => {
    const pedal = new Pedal({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        state: req.body.state,
        brand: req.body.brand,
        price: req.body.price,
        sell: req.body.sell,
        rent: req.body.rent
    })
    saveCover(pedal, req.body.cover)

    try {
        const newPedal = await pedal.save();
        res.redirect('/compraventa/all')
    } catch (err) {
        console.log(err);
        /*res.redirect('pedal/new');*/
    }
});

function saveCover(pedal, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        pedal.coverImage = new Buffer.from(cover.data, 'base64');
        pedal.coverImageType = cover.type;
    }
}

module.exports = router;