const express = require('express');
const Post = require('./../models/db/postModel');
const router = express.Router();

// boton ALL POST from vista showe.js not working (yet)
router.get('/', async(req, res) => {
    const post = await Post.find().sort({ createdAt: 'desc' })
    res.render('test', { post: post });
})

router.get('/new', (req, res) => {
    res.render('post/new', { post: new Post() });
})

router.get('/edit/:id', async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post/edit', { post: post });
})

router.get('/:slug', async(req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    if (post == null) res.redirect('/')
    res.render('post/show', { post: post });
})

router.post('/', async(req, res, next) => {
    req.post = new Post();
    next();
}, savePostAndRedirect('new'))

router.put('/:id', async(req, res, next) => {
    req.post = await Post.findById(req.params.id)
    next()
}, savePostAndRedirect('edit'))

router.delete('/:id', async(req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/post/')
})

function savePostAndRedirect(path) {
    return async(req, res) => {
        let post = req.post
        post.title = req.body.title
        post.description = req.body.description
        post.markdown = req.body.markdown
        try {
            post = await post.save()
            res.redirect(`/post/${post.slug}`)
        } catch (e) {
            res.render(`post/${path}`, { post: post })
        }
    }
}

module.exports = router;