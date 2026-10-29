import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
export function createTokens(user) {
  const common = { id: user._id.toString(), role: user.role };
  const access = jwt.sign(common, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m', jwtid: randomUUID() });
  const refresh = jwt.sign(common, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES || '30d', jwtid: randomUUID() });
  return { accessToken: access, refreshToken: refresh };
}
export function makeOtp() { return String(Math.floor(100000 + Math.random() * 900000)); }
