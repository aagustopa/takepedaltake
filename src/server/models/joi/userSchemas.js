const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    create: Joi.object({
        firstName: Joi.string().alphanum().max(20).min(2).required(),
        lastName: Joi.string().max(20).min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(15).required(),
        repeat_password: Joi.ref('password'),
        birthDate: Joi.date().required(),
        roles: Joi.array().items(Joi.string().optional())
    }),
    update: Joi.object({
        firstName: Joi.string().alphanum().max(20).min(2).optional(),
        lastName: Joi.string().max(20).min(2).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(4).max(15).optional(),
        repeat_password: Joi.ref('password'),
        birthDate: Joi.date().optional(),
        roles: Joi.array().items(Joi.string().optional())
    }),
    id: Joi.object({
        id: Joi.objectId()
    })
}