const express = require('express');
const router = express.Router();
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');

const userController = require('../controllers/userController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const validatingJoi = require('../middlewares/joiValidation');
const userSchema = require('../models/joi/userSchemas');

const User = require('../models/db/userModel');
const toastr = require('toastr');
const { ensureAuthenticated, ensureGuest } = require('../middlewares/guard/authenticated');

const users = [];

router.get('/list',
    joiSchemaValidation.validate(userSchema.getUserListSchema, 'query'),
    userController.getAllUsers);

router.get('/create',
    // joiSchemaValidation.validate(userSchema.createUserSchema, `body`),
    // userController.create);
);

router.get('/login', ensureGuest, (req, res) => {
    res.render('user/login');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: 'profile',
        failureRedirect: 'login',
        failureFlash: true
    })(req, res, next);
});

router.get('/register', ensureGuest, (req, res) => {
    res.render('user/register');
})

router.post('/register',
    validatingJoi.validate(userSchema.create),
    userController.create
);

router.get('/profile', ensureAuthenticated, (req, res) =>
    res.render('user/profile', {
        name: req.user.name
    }));

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('login');
    // res.send('cerraste sesion putito');
})


/* register from video nodejs passport login system
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
})*/

// this works
// const hashedPassword = await bcrypt.hash(req.body.password, 10);
// let user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: hashedPassword,
//     birthDate: req.body.birthDate
// });
// try {
//     user = await user.save();
//     toastr.success('The process has been saved.', 'Success');
//     res.redirect('/');
// } catch (e) {
//     console.log(e);
//     res.send(`el registro ha petado ${e}`)
// }

// https://www.geeksforgeeks.org/routing-path-for-expressjs/?ref=rp
module.exports = router;