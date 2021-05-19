const { Router } = require('express');
const express = require('express');
const router = express.Router();
const app = express();

const userController = require('../controllers/userController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const userSchema = require('../models/joi/userSchemas')

router.get('/list',
    joiSchemaValidation.validate(userSchema.getUserListSchema, 'query'),
    userController.getAllUsers);

router.get('/create',
    // joiSchemaValidation.validate(userSchema.createUserSchema, `body`),
    // userController.create);
    app.get('/create', function(req, ) {
        res.render('hola mundo');
    })
);

router.get('/home', function(req, res) {
    res.send('home page');
})

// https://www.geeksforgeeks.org/routing-path-for-expressjs/?ref=rp
module.exports = router;