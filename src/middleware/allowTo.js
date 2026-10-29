import AppError from '../utils/AppError.js';
export default (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : next(new AppError('You do not have permission', 403));
