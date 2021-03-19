const express = require('express');
const router = express.Router();

router.get('/createUser', function(req, res) {
    res.send('Creando usuario');
})

module.exports = router;