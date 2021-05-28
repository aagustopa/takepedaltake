const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// user model
const User = require('../models/db/userModel');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Ese email no está registrado' });
                    }

                    // match pwd    html-pwd   db-pwd       callback tiene posible error (err) y un boolean llamado isMatch si las pwd coinciden
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        // si hay algun error entonces lanza el error
                        if (err) throw err;
                        // pero si el bolean ismatch es true entonces...     el null contiene error?
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Contraseña incorrecta' })
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    // esto coge un usuario y callback
    // en el momento que el usuario se autentique nosotros almacenamos en una sesion su id
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // esto es el proceso inverso
    // coge un id y genera un usuario
    // explicado: si hay un usuario en la sesion lo que haré será busca por id ese usuario
    // en la busqueda puede encontrar al usuario o tener un error y eso enviamos
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}