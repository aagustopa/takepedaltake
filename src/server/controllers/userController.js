const userService = require('../services/userServices');
const bcrypt = require('bcrypt');
const User = require('../models/db/userModel');
const Role = require('../models/db/roleModel');
const { data } = require('jquery');
// const roles = async(roles) => {
//     if (roles) {
//         const foundRoles = await Role.find({ name: { $in: roles } });
//         data.roles = foundRoles.map(role => role._id)
//     } else {
//         const role = await Role.findOne({ name: "user" });
//         data.roles = [role._id];
//     }
// }

const sendToService = async(data) => {
    const responseFromService = await userService.create(data);
    if (responseFromService.status) {
        responseObj.body = responseFromService.result;
        responseObj.msg = `User created succesfully`;
        responseObj.status = 201;
        req.flash('success_msg', 'Estas registrado, ya puedes logearte');
        res.redirect('login');
    }
}

module.exports.create = async(req, res) => {
    console.log('creating user');
    const responseObj = { status: 500, msg: 'Internal server error' };
    try {
        const hashPwd = await bcrypt.hash(req.body.password, 10);
        const adminRole = req.body.roles
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPwd,
            birthDate: req.body.birthDate,
            roles: adminRole
        }
        const emailUser = await User.findOne({ email: data.email });
        if (emailUser) {
            req.flash('error_msg', 'Ese email ya existe');
            res.redirect('register');
        } else {
            sendToService(data);
        }
        if (adminRole) {
            console.log('admin role');
            const foundRoles = await Role.find({ name: { $in: adminRole } });
            data.roles = foundRoles.map(role => role._id)
        } else {
            console.log('user role by default');
            const role = await Role.findOne({ name: "user" });
            data.roles = [role._id];
            sendToService(data);
        }
        // sendToService(data);
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-userController-create ${error}`);
    }
    res.status(responseObj.status).send(responseObj);
}