import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DATABASE: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().default(10),
});
