const Joi = require('joi');

const validateSignup = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
            .messages({
                "string.pattern.base":
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
            }),
        orgId: Joi.string().required()
    });

    return schema.validate(data);
};

module.exports = { validateSignup };
