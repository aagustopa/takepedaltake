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
    create: Joi.object({
        firstName: Joi.string().alphanum().max(20).min(2).required(),
        lastName: Joi.string().max(20).min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(15).required(),
        birthDate: Joi.date().required()
    }).validate(this.createUserSchema, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    })
}