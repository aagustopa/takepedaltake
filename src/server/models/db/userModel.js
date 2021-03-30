const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    repeat_password: String,
    birthDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);