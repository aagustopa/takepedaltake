const User = require('../models/db/userModel');
const Role = require('../models/db/roleModel');

module.exports = {
    isAdmin: async(req, res, next) => {
        const user = await User.findById(req.userId);
    }
}