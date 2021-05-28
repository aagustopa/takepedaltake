const userService = require('../services/userServices');
const bcrypt = require('bcrypt');
const User = require('../models/db/userModel');

module.exports.getAllUsers = async(req, res) => {
    console.log('list of users');
    const responseObj = { status: 500, msg: 'Internal server error' };
    try {
        const data = {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        };
        const responseFromService = await userService.getAllUsers(data);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.msg = 'Users fetched succesfully';
                responseObj.status = 200;
            } else {
                responseObj.msg = 'No users found';
                responseObj.status = 404;
            }
        }
    } catch (error) {
        console.log('ERROR-userController-getAllUsers: ', error);
    }
    res.status(responseObj.status).send(responseObj);
}

module.exports.create = async(req, res) => {
    console.log('creating user');
    const responseObj = { status: 500, msg: 'Internal server error' };
    try {
        const hashPwd = await bcrypt.hash(req.body.password, 10);
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPwd,
            birthDate: req.body.birthDate
        }
        const emailUser = await User.findOne({ email: data.email });
        if (emailUser) {
            req.flash('error_msg', 'Ese email ya existe putito');
            res.redirect('register');
        } else {
            const responseFromService = await userService.create(data);
            if (responseFromService.status) {
                responseObj.body = responseFromService.result;
                responseObj.msg = `User created succesfully`;
                responseObj.status = 201;
                req.flash('success_msg', 'Estas registrado, ya puedes logearte');
                res.redirect('login');
            }
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-userController-create ${error}`);
    }
    res.status(responseObj.status).send(responseObj);
}