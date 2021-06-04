const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Pedal = require('../models/db/pedalModel');
const uploadPath = path.join(__dirname, '../../public', Pedal.coverImageBasePath);
const imageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
})

router.get('/', (req, res) => {
    res.render('pedal/pedals');
});

router.get('/all', async(req, res) => {
    const pedal = await Pedal.find({});
    console.log(pedal.coverImagePath);
    /*const post = await Post.find({user:req.user.id}).sort({ createdAt: 'desc' });*/
    res.render('pedal/all', { pedal: pedal });
})

router.get('/new', (req, res) => {
    console.log(path);
    console.log(__dirname);
    res.render('pedal/new', { pedal: new Pedal() });
    // res.render('post/new', { post: new Post() });
});

router.post('/create', upload.single('cover'), async(req, res) => {
    const fileName = req.file != null ? req.file.filename : null;
    const pedal = new Pedal({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        state: req.body.state,
        brand: req.body.brand,
        price: req.body.price,
        sell: req.body.sell,
        rent: req.body.rent,
        coverImageName: fileName
    })

    try {
        const newPedal = await pedal.save();
        res.redirect('/compraventa')
    } catch (err) {
        if (pedal.coverImageName != null) {
            removeBookCover(pedal.coverImageName);
        }
        console.log(err);
        /*res.redirect('pedal/new');*/
    }
});

function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err);
    })
}

module.exports = router;