import * as Joi from '@hapi/joi';

export default {
  create: Joi.object({
    name: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el nombre')),
    surnames: Joi.string()
      .required()
      .error(SyntaxError('Ingrese los apellidos')),
    phone: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el teléfono')),
    veterinary_id: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el identificador del veterinario')),
    date: Joi.date()
      .required()
      .error(SyntaxError('Ingrese la fecha')),
    details: Joi.string()
      .required()
      .error(SyntaxError('Ingrese los detalles'))
  }),
  update: Joi.object({
    name: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el nombre')),
    surnames: Joi.string()
      .required()
      .error(SyntaxError('Ingrese los apellidos')),
    phone: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el teléfono')),
    veterinary_id: Joi.string()
      .required()
      .error(SyntaxError('Ingrese el identificador del veterinario')),
    date: Joi.date()
      .required()
      .error(SyntaxError('Ingrese la fecha')),
    details: Joi.string()
      .required()
      .error(SyntaxError('Ingrese los detalles'))
  })
};
