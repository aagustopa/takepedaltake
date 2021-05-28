const mongoose = require('mongoose');
// video min 51:35 about marked, dompurify etc etc
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

// https://www.markdownguide.org/basic-syntax/

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});
/* favourite:{
        type:Boolean,
        default:false

    https://www.youtube.com/watch?v=3J925fRl_UE
    minuto 1:13:50

    }*/

// video min 41:30
postSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next()
})

module.exports = mongoose.model('Post', postSchema);

// module.exports = mongoose.mongo.model('Post', mongoose.Schema({
//     title: String,
//     description: String,
//     markdown: String
// }))