const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// about de regex on line 15
// /^
//   (?=.*\d)          should contain at least one digit
//   (?=.*[a-z])       should contain at least one lower case
//   (?=.*[A-Z])       should contain at least one upper case
//   [a-zA-Z0-9]{8,}   should contain at least 8 from the mentioned characters
// $/

module.exports = {
    getUserListSchema: Joi.object({
        skip: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional()
    }).and('skip', 'limit'),
    createUserSchema: Joi.object({
        firstName: Joi.string().alphanum().max(20).min(2).required(),
        lastName: Joi.string().alphanum().max(20).min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')),
        repeat_password: Joi.ref('password')
    })
}