const express = require('express');
const router = express.Router();
const Demo = require('../models/db/demoModel');
const User = require('../models/db/userModel');
const imageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const { isAdmin } = require('../middlewares/authRole');
const { ensureAuthenticated } = require('../middlewares/guard/authenticated');


router.get('/', async(req, res) => {
    try {
        const demo = await Demo.find({});
        res.render('demo/demo', { demo: demo });
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
});

router.get('/create', ensureAuthenticated, isAdmin, (req, res) => {
    res.render('demo/create', { demo: new Demo() });
});

router.post('/new', async(req, res) => {
    const demo = new Demo({
        title: req.body.title,
        description: req.body.description,
        subtitle: req.body.subtitle,
        subDescription: req.body.subDescription,
        subtitle2: req.body.subtitle2,
        subDescription2: req.body.subDescription2,
        subtitle3: req.body.subtitle3,
        subDescription3: req.body.subDescription3,
        subtitle4: req.body.subtitle4,
        subDescription4: req.body.subDescription4,
        finalTitle: req.body.finalTitle,
        finalDescription: req.body.finalDescription,
    });
    saveFirstCover(demo, req.body.firstCover);
    saveSecondCover(demo, req.body.secondCover);
    saveThirdCover(demo, req.body.thirdCover)
    saveFourthCover(demo, req.body.fourthCover);
    try {
        const newDemo = await demo.save();
        res.redirect('/demo');
    } catch (err) {
        console.log(err);
    }
});

router.get('/update/:id', ensureAuthenticated, isAdmin, async(req, res) => {
    const demo = await Demo.findById(req.params.id);
    res.render('demo/edit', { demo: demo });
})

router.put('/:id', async(req, res) => {
    let demo;

    try {
        demo = await Demo.findById(req.params.id);
        demo.title = req.body.title
        demo.description = req.body.description
        demo.subtitle = req.body.subtitle
        demo.subDescription = req.body.subDescription
        demo.subtitle2 = req.body.subtitle2
        demo.subDescription2 = req.body.subDescription2
        demo.subtitle3 = req.body.subtitle3
        demo.subDescription3 = req.body.subDescription3
        demo.subtitle4 = req.body.subtitle4
        demo.subDescription4 = req.body.subDescription4
        demo.finalTitle = req.body.finalTitle
        demo.finalDescription = req.body.finalDescription
        if (req.body.firstCover != null && req.body.firstCover != '') {
            saveCover(demo, req.body.firstCover)
        } else if (req.body.secondCover != null && req.body.secondCover != '') {
            saveCover(demo, req.body.secondCover)
        } else if (req.body.thirdCover != null && req.body.thirdCover != '') {
            saveCover(demo, req.body.thirdCover)
        } else if (req.body.fourthCover != null && req.body.fourthCover != '') {
            saveCover(demo, req.body.fourthCover)
        }
        await demo.save();
        res.redirect(`/demo/`);
    } catch (err) {
        console.log(err);
        if (demo != null) {
            res.redirect(`demo/update/${demo.id}`)
        } else {
            res.redirect('demo/demo')
        }
    }
});

router.delete('/:id', async(req, res) => {
    await Demo.findByIdAndDelete(req.params.id)
    res.redirect('/demo/')
});

function saveFirstCover(pedal, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        pedal.coverImage = new Buffer.from(cover.data, 'base64');
        pedal.coverImageType = cover.type;
    }
}

function saveSecondCover(pedal, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        pedal.coverImage2 = new Buffer.from(cover.data, 'base64');
        pedal.coverImageType2 = cover.type;
    }
}

function saveThirdCover(pedal, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        pedal.coverImage3 = new Buffer.from(cover.data, 'base64');
        pedal.coverImageType3 = cover.type;
    }
}

function saveFourthCover(pedal, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        pedal.coverImage4 = new Buffer.from(cover.data, 'base64');
        pedal.coverImageType4 = cover.type;
    }
}

module.exports = router;