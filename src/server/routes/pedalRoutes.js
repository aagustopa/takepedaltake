const express = require('express');
const router = express.Router();
const Pedal = require('../models/db/pedalModel');
const imageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const { ensureAuthenticated, ensureGuest } = require('../middlewares/guard/authenticated');

router.get('/', async(req, res) => {
    try {
        const pedals = await Pedal.find({});
        res.render('pedal/pedals', {
            pedals: pedals,
        })
    } catch {
        res.redirect('/')
    }
});

router.get('/new', ensureAuthenticated, (req, res) => {
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
        res.redirect('/compraventa/')
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', ensureAuthenticated, async(req, res) => {
    const pedal = await Pedal.findById(req.params.id);
    if (pedal == null) res.redirect('/');
    res.render('pedal/show', { pedal: pedal });
});


router.get('/update/:id', ensureAuthenticated, async(req, res) => {
    const pedal = await Pedal.findById(req.params.id);
    res.render('pedal/edit', { pedal: pedal });
});

router.put('/:id', async(req, res) => {
    let pedal;

    try {
        pedal = await Pedal.findById(req.params.id);
        pedal.name = req.body.name
        pedal.description = req.body.description
        pedal.category = req.body.category
        pedal.state = req.body.state
        pedal.brand = req.body.brand
        pedal.price = req.body.price
        pedal.sell = req.body.sell
        pedal.rent = req.body.rent
        if (req.body.cover != null && req.body.cover != '') {
            saveCover(pedal, req.body.cover)
        }
        await pedal.save();
        res.redirect(`/compraventa/${pedal.id}`);
    } catch (err) {
        console.log(err);
        if (pedal != null) {
            res.redirect(`compraventa/update/${pedal.id}`)
        } else {
            res.redirect('compraventa/all')
        }
    }
});

router.delete('/:id', async(req, res) => {
    await Pedal.findByIdAndDelete(req.params.id)
    res.redirect('/compraventa/')
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