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

// router.post('/create',
//     joiSchemaValidation.validate(userSchema.create, `body`),
//     userController.create);

router.get('/login', ensureGuest, (req, res) => {
    res.render('user/login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'login',
        failureFlash: true
    })(req, res, next);
});

router.get('/register', ensureGuest, (req, res) => {
    res.render('user/register');
});

router.post('/register',
    validatingJoi.validate(userSchema.create),
    userController.create
);

router.get('/profile', ensureAuthenticated, async(req, res) => {
    const user = await User.findById(req.user.id).populate('roles');
    res.render('user/profile', { user: user });
});

router.get('/update/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.render('user/edit', { user: user });
});

router.put('/:id', async(req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.email = req.body.email
        user.password = req.body.password
        user.repeat_password = req.body.repeat_password
        user.birthDate = req.body.birthDate
        if (user.email) {
            checkEmail(user.email);
        }
        if (user.password && user.password === user.repeat_password) {
            const hashPwd = await bcrypt.hash(user.password, 10);
            user.password = hashPwd;
        }
        await user.save();
        req.flash('user_updated', 'Usuario actualizado con éxito');
        res.redirect(`/profile`)
    } catch (err) {
        console.log(err);
        res.redirect('/user/profile');
    }
});

router.delete('/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    req.flash('user_deleted', 'Cuenta eliminada con éxito');
    res.redirect('/user/login');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('login');
});

function checkEmail(userEmail) {
    return async(req, res) => {
        const emailUser = await User.findOne({ email: userEmail });
        if (emailUser) {
            req.flash('error_msg', 'Ese email ya existe');
            res.redirect(`/user/update/${user.id}`)
        }
    }
}

// function encryptingPwd(password) {
//     const hashPwd = await bcrypt.hash(password, 10);

// }
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