const User = require('../models/db/userModel');
const Role = require('../models/db/roleModel');
const mongoose = require('mongoose');

module.exports = {
    isAdmin: async(req, res, next) => {
        const user = await User.findById(req.user._id);
        // objectID
        console.log(req.user._id);
        console.log(user);
        const rolesModel = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < rolesModel.length; i++) {
            if (rolesModel[i].name === "admin") {
                next();
                return;
            }
            // else {
            //     res.redirect('/');
            //     console.log('No eres admin');
            // }
        }
        return res.status(403).json({ message: 'Sorry putito, only admins allowed' });
    },
    isModerator: async(req, res, next) => {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                next();
                return;
            }
            // else {
            //     res.redirect('/');
            //     console.log('No eres admin');
            // }
        }
        return res.status(403).json({ message: 'Sorry putito, only moderators allowed' });
    }
}