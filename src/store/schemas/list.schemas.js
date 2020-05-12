import Joi from '@hapi/joi'

export const itemSchema = Joi.object({
  id: Joi.string()
    .label('ID')
    .required()
    .guid({ version: ['uuidv4'] })
    .messages({
      'any.required': 'List ID is required.',
      'string.empty': 'List ID is required.',
      'string.guid': 'ID must be in uuidv4 format.',
    }),

  title: Joi.string()
    .label('Title')
    .required()
    .max(40)
    .messages({
      'any.required': 'Please enter a title.',
      'string.empty': 'Please enter a title.',
      'string.max': 'Please enter a title up to 40 characters long.',
    }),
  
  isCompleted: Joi.boolean()
    .label('Is completed?')
    .required()
    .messages({
      'any.required': 'Is completed? flag is required.',
    }),
});

export const newListSchema = Joi.object({
  title: Joi.string()
    .label('Title')
    .required()
    .max(40)
    .messages({
      'any.required': 'Please enter a title.',
      'string.empty': 'Please enter a title.',
      'string.max': 'Please enter a title up to 40 characters long.',
    }),
  
  description: Joi.string()
    .label('Description')
    .optional()
    .allow('')
    .max(400)
    .messages({
      'string.max': 'Please enter a description up to 400 characters long.',
    }),
  
  createdAt: Joi.date()
    .label('Created at')
    .required()
    .timestamp()
    .less('now')
    .messages({
      'any.required': 'Created at date is required.',
      'date.format': 'Created at date must be a timestamp.',
      'date.less': 'Created at date must be in the past.',
    }),

  updatedAt: Joi.date()
    .label('Updated at')
    .required()
    .timestamp()
    .valid(Joi.ref('createdAt'))
    .messages({
      'any.required': 'Updated at date is required.',
      'any.allowOnly': 'Updated at date must match created at date.',
      'date.format': 'Updated at date must be a timestamp.',
    }),
  
  items: Joi.array()
    .label('Items')
    .required()
    .length(0)
    .messages({
      'any.required': 'Items array is required.',
      'array.length': 'Items array must be empty.',
    }),
});

export const existingListSchema = Joi.object({
  id: Joi.string()
    .label('ID')
    .required()
    .length(20)
    .pattern(new RegExp('^[a-zA-Z0-9]{20}$'))
    .messages({
      'any.required': 'List ID is required.',
      'string.empty': 'List ID is required.',
      'string.length': 'ID must be 20 characters long.',
      'string.regex.base': 'ID must be alphanumeric and 20 characters long.',
    }),

  title: Joi.string()
    .label('Title')
    .required()
    .max(40)
    .messages({
      'any.required': 'Please enter a title.',
      'string.empty': 'Please enter a title.',
      'string.max': 'Please enter a title up to 40 characters long.',
    }),
  
  description: Joi.string()
    .label('Description')
    .optional()
    .allow('')
    .max(400)
    .messages({
      'string.max': 'Please enter a description up to 400 characters long.',
    }),
  
  createdAt: Joi.date()
    .label('Created at')
    .required()
    .timestamp()
    .less('now')
    .messages({
      'any.required': 'Created at date is required.',
      'date.format': 'Created at date must be a timestamp.',
      'date.less': 'Created at date must be in the past.',
    }),

  updatedAt: Joi.date()
    .label('Updated at')
    .required()
    .timestamp()
    .greater('now')
    .greater(Joi.ref('createdAt'))
    .messages({
      'any.required': 'Updated at date is required.',
      'date.format': 'Updated at date must be a timestamp.',
      'date.greater': 'Updated at date must not be in the past.',
    }),
  
  items: Joi.array()
    .label('Items')
    .required()
    .messages({
      'any.required': 'Items array is required.',
    })
    .items(itemSchema),
});
