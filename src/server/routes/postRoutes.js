const express = require('express');
const Post = require('./../models/db/postModel');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../middlewares/guard/authenticated');

router.get('/', ensureAuthenticated, async(req, res) => {
    const post = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    res.render('post/posts', { posts: post });
})

router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('post/new', { post: new Post() });
})

// ruta para actualizar boton de favorito (boolean)
router.get('/turn/:id', ensureAuthenticated, async(req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    post.favourite = !post.favourite;
    await post.save();
    res.redirect('/post/');
})

router.get('/edit/:id', ensureAuthenticated, async(req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post/edit', { post: post });
})

router.get('/:slug', ensureAuthenticated, async(req, res) => {
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
});

function savePostAndRedirect(path) {
    return async(req, res) => {
        let post = req.post
        post.title = req.body.title
        post.description = req.body.description
        post.markdown = req.body.markdown
        post.user = req.user.id
        try {
            post = await post.save()
            res.redirect(`/post/${post.slug}`)
        } catch (e) {
            res.render(`post/${path}`, { post: post })
        }
    }
}

module.exports = router;