import * as Joi from '@hapi/joi';

export default {
  create: Joi.object({
    name: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el nombre')),
    surnames: Joi.string()
      .required()
      .error(SyntaxError('Ingrese los apellidos')),
    specialty: Joi.string()
      .required()
      .error(SyntaxError('Ingrese la especialidad')),
    phone: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el teléfono'))
  }),
  update: Joi.object({
    name: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el nombre')),
    surnames: Joi.string()
      .required()
      .error(SyntaxError('Ingrese los apellidos')),
    specialty: Joi.string()
      .required()
      .error(SyntaxError('Ingrese la especialidad')),
    phone: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el teléfono'))
  })
};
