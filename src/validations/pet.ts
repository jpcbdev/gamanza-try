import * as Joi from '@hapi/joi';

export default {
  create: Joi.object({
    name: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el nombre')),
    species: Joi.string()
      .required()
      .error(SyntaxError('Ingrese la especie')),
    breed: Joi.string()
      .required()
      .error(SyntaxError('Ingrese la raza')),
    customer_id: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el identificador del dueño'))
  }),
  update: Joi.object({
    name: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el nombre')),
    species: Joi.string()
      .required()
      .error(SyntaxError('Ingrese la especie')),
    breed: Joi.string()
      .required()
      .error(SyntaxError('Ingrese la raza')),
    customer_id: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el identificador del dueño'))
  })
};
