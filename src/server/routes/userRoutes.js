const express = require('express');
const router = express.Router();
const app = express();
const bcrypt = require('bcrypt');

const userController = require('../controllers/userController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const userSchema = require('../models/joi/userSchemas');

const User = require('../models/db/userModel');
const toastr = require('toastr');

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

router.post('/register', (req, res) => {
    if (userSchema.create, userController.create) {
        console.log('usuario creado correctamente')
    }
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