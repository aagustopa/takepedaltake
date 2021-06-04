const { optional } = require('joi');
const mongoose = require('mongoose');

const demoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: Buffer,
        required: true
    },
    secondTitle: {
        type: String,
        required: true
    },
    secondDescription: {
        type: String,
        required: true
    },
    coverImage2: {
        type: Buffer,
        required: true
    },
    thirdTitle: {
        type: String,
        required: true
    },
    thirdDescription: {
        type: String,
        required: true
    },
    coverImage3: {
        type: Buffer,
        required: true
    },
    fourthTitle: {
        type: String,
        required: optional
    },
    fourthDescription: {
        type: String,
        required: optional,
    },
    coverImage4: {
        type: Buffer,
        required: optional
    },
    coverImageType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    // titulo
    // descripcion 1
    // foto 1
    // titulo2
    // descripcion2
    // foto2
    // description3
    // foto3
})

module.exports = mongoose.model('Demo', demoSchema);