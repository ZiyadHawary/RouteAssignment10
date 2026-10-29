import Joi from 'joi';
const password = Joi.string().min(8).required();
export const signup = Joi.object({ name: Joi.string().min(2).max(80).required(), email: Joi.string().email().required(), password, phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required() });
export const login = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
export const otp = Joi.object({ email: Joi.string().email().required(), otp: Joi.string().length(6).pattern(/^\d{6}$/).required() });
export const emailOnly = Joi.object({ email: Joi.string().email().required() });
export const reset = otp.keys({ password });
export const refresh = Joi.object({ refreshToken: Joi.string().required() });

export const otpOnly = Joi.object({ otp: Joi.string().length(6).pattern(/^\d{6}$/).required() });

export const logout = Joi.object({ refreshToken: Joi.string() });
