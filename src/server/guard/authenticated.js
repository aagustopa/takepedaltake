module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Necesitas inciar sesión para crear un post');
        res.redirect('../user/login');
    }
}