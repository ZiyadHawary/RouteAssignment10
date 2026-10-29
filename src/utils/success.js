export const success = (res, data, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ status: 'success', message, data });
