import Joi from 'joi';

const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])');

const password = Joi.string().pattern(PASSWORD_REGEX).min(8).max(50).required().messages({
  'string.pattern.base': 'Password needs lowercase, uppercase letter and at least one special character and number.',
  'string.min': 'Password must have at least 8 characters',
  'any.required': 'Password required',
  'string.empty': 'Password cannot be empty',
});

const email = Joi.string().trim().email().required();

const loginSchema = Joi.object({ email, password });

export { loginSchema };
