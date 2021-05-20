const express = require('express');
const router = express.Router();
const app = express();
const bcrypt = require('bcrypt');

const userController = require('../controllers/userController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const userSchema = require('../models/joi/userSchemas');

const users = [];

router.get('/list',
    joiSchemaValidation.validate(userSchema.getUserListSchema, 'query'),
    userController.getAllUsers);

router.get('/create',
    // joiSchemaValidation.validate(userSchema.createUserSchema, `body`),
    // userController.create);
);

router.get('/login', (req, res) => {
    res.render('user/login');
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
    res.render('user/register');
})

router.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('login')
    } catch (e) {
        res.redirect('/register')
    }
    console.log(users);
})


// https://www.geeksforgeeks.org/routing-path-for-expressjs/?ref=rp
module.exports = router;