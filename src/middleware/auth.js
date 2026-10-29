import jwt from 'jsonwebtoken';
import User from '../DB/models/User.model.js';
import RevokedToken from '../DB/models/RevokedToken.model.js';
import AppError from '../utils/AppError.js';
export default async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.slice(7);
    if (!token) throw new AppError('You must be logged in', 401);
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (await RevokedToken.exists({ jti: payload.jti })) throw new AppError('Token has been revoked', 401);
    const user = await User.findById(payload.id);
    if (!user) throw new AppError('User no longer exists', 401);
    if (user.changeCredentialsTime && payload.iat * 1000 < user.changeCredentialsTime.getTime()) throw new AppError('Please log in again', 401);
    req.user = user; req.tokenPayload = payload; next();
  } catch (err) { next(err instanceof AppError ? err : new AppError('Invalid or expired token', 401)); }
}
