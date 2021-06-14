const express = require('express');
const router = express.Router();
const Demo = require('../models/db/demoModel');
const { isAdmin } = require('../middlewares/authRole');
const { ensureAuthenticated } = require('../middlewares/guard/authenticated');

router.get('/adminPanel', ensureAuthenticated, isAdmin, async(req, res) => {
    try {
        const demo = await Demo.find({});
        res.render('admin/adminPanel', { demo: demo });
    } catch (err) {
        console.log(err);
        res.redirect('/demo');
    }
})

module.exports = router;