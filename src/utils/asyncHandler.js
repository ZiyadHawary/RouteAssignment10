// Pass async route errors to Express instead of repeating try/catch everywhere.
export default (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
