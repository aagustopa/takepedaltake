const express = require('express');
const router = express.Router();

const { isAdmin } = require('../middlewares/authRole');
const { ensureAuthenticated } = require('../middlewares/guard/authenticated');

const Demo = require('../models/db/demoModel');

router.get('/', (req, res) => {
    res.render('demo/demo');
})

router.get('/adminPanel', ensureAuthenticated, isAdmin, (req, res) => {
    res.render('admin/adminPanel');
    // res.send('Aqui solo puede entrar el admin, putitos not allowed');
})

router.get('/create', ensureAuthenticated, isAdmin, (req, res) => {
    res.render('demo/create', { demo: new Demo() });
})

router.post('/new', async(req, res) => {
    res.send('demo creada');
});

module.exports = router;