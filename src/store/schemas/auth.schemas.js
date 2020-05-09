import Joi from '@hapi/joi'

export const signInSchema = Joi.object({
  emailAddress: Joi.string()
    .label('Email address')
    .required()
    .messages({
      'any.required': 'Please enter your email address.',
      'string.empty': 'Please enter your email address.',
    }),

  password: Joi.string()
    .label('Password')
    .required()
    .messages({
      'any.required': 'Please enter your password.',
      'string.empty': 'Please enter your password.',
    }),
});
