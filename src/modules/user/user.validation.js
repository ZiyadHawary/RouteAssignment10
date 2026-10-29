import Joi from 'joi';
export const update = Joi.object({name:Joi.string().min(2).max(80),email:Joi.string().email(),phone:Joi.string().pattern(/^01[0125][0-9]{8}$/)}).min(1);
export const password = Joi.object({currentPassword:Joi.string().required(),newPassword:Joi.string().min(8).required()});
export const id = Joi.object({id:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()});
