const express = require('express');
const router = express.Router();
const Demo = require('../models/db/demoModel');
const { isAdmin } = require('../middlewares/authRole');
const { ensureAuthenticated } = require('../middlewares/guard/authenticated');


// 60c677771a4791149411e729
router.get('/adminPanel', ensureAuthenticated, isAdmin, async(req, res) => {
    try {
        // const demo = await Demo.findById(req.params.id);
        const demo = await Demo.find({});
        res.render('admin/adminPanel', { demo: demo });
    } catch (err) {
        console.log(err);
        res.redirect('/demo');
    }
    console.log('id de la demo' + demo.id);
})

module.exports = router;