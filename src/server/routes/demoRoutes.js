const express = require('express');
const router = express.Router();

const { isAdmin } = require('../middlewares/authRole');
const { ensureAuthenticated, ensureGuest } = require('../middlewares/guard/authenticated');

router.get('/', (req, res) => {
    res.render('demo/demo');
})

router.get('/adminPanel', ensureAuthenticated, isAdmin, (req, res) => {
    res.render('admin/adminPanel');
    // res.send('Aqui solo puede entrar el admin, putitos not allowed');
})

router.post('/create', (req, res) => {
    res.send('creando demo');
})

module.exports = router;