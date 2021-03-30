const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const userSchema = require('../models/joi/userSchemas')

router.get('/list',
    joiSchemaValidation.validate(userSchema.getUserListSchema, 'query'),
    userController.getAllUsers);

router.get('/create',
    joiSchemaValidation.validate(userSchema.createUserSchema, `body`),
    userController.create);

module.exports = router;