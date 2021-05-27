const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('view demo')
})


router.get('/create', (req, res) => {
    res.send('Aqui solo puede entrar el admin, putitos not allowed');
})

router.post('/create', (req, res) => {
    res.send('creando demo');
})

module.exports = router;