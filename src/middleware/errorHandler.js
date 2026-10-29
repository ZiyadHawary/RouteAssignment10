export function notFound(req, res, next) { const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`); err.statusCode = 404; next(err); }
export function errorHandler(err, req, res, next) {
  let status = err.statusCode || 500, message = err.message || 'Internal server error';
  if (err.name === 'ValidationError') { status = 400; message = err.message; }
  if (err.name === 'MulterError') { status = 400; message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 2 MB or smaller' : err.message; }
  if (err.code === 11000) { status = 409; message = 'A record with this value already exists'; }
  res.status(status).json({ status: status < 500 ? 'fail' : 'error', message });
}
