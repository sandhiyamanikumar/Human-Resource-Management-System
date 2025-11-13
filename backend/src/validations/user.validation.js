const Joi = require('joi');

const validateSignup = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'hr', 'employee'),
        orgId: Joi.string().required()
    });

    return schema.validate(data);
};

module.exports = { validateSignup };
