const { optional, string } = require('joi');
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
    subtitle: {
        type: String,
        required: true
    },
    subDescription: {
        type: String,
        required: true
    },
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    subtitle2: {
        type: String,
        required: true
    },
    subDescription2: {
        type: String,
        required: true
    },
    coverImage2: {
        type: Buffer,
        required: true
    },
    coverImageType2: {
        type: String,
        required: true
    },
    subtitle3: {
        type: String,
        required: true
    },
    subDescription3: {
        type: String,
        required: true
    },
    coverImage3: {
        type: Buffer,
        required: true
    },
    coverImageType3: {
        type: String,
        required: true
    },
    subtitle4: {
        type: String,
        required: true
    },
    subDescription4: {
        type: String,
        required: true
    },
    coverImage4: {
        type: Buffer,
        required: true
    },
    coverImageType4: {
        type: String,
        required: true
    },
    finalTitle: {
        type: String,
        required: true
    },
    finalDescription: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

demoSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
});

demoSchema.virtual('coverImagePath2').get(function() {
    if (this.coverImage2 != null && this.coverImageType2 != null) {
        return `data:${this.coverImageType2};charset=utf-8;base64,${this.coverImage2.toString('base64')}`
    }
});

demoSchema.virtual('coverImagePath3').get(function() {
    if (this.coverImage3 != null && this.coverImageType3 != null) {
        return `data:${this.coverImageType3};charset=utf-8;base64,${this.coverImage3.toString('base64')}`
    }
})

demoSchema.virtual('coverImagePath4').get(function() {
    if (this.coverImage4 != null && this.coverImageType4 != null) {
        return `data:${this.coverImageType4};charset=utf-8;base64,${this.coverImage4.toString('base64')}`
    }
})


module.exports = mongoose.model('Demo', demoSchema);