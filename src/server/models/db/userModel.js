const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
    /* relacion 1-n de que un usuario puede tener más de un rol
    roles:[{
        ref:"Role",
        type: mongoose.Schema.Types.ObjectId
    }]*/
});

module.exports = mongoose.model('User', userSchema);