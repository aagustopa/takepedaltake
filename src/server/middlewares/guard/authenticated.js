module.exports = {
    ensureAuthenticated: (req, res, next) => {
        // isAuthenticated() es una funcion del paquete passport
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Necesitas inciar sesión antes');
        res.redirect('../user/login');
    },
    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/')
        } else {
            return next()
        }
    }
}