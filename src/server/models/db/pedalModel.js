const mongoose = require('mongoose');

const pedalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sell: {
        type: Boolean,
        default: false
    },
    rent: {
        type: Boolean,
        default: false
    },
    coverImageName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// make conditional or validation
// that if there's no sell or rent then error
// there must be one of them or both

module.exports = mongoose.model('Pedal', pedalSchema);