import multer from 'multer';
import path from 'node:path';
import AppError from '../utils/AppError.js';
const storage = multer.diskStorage({ destination: 'uploads/', filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname).toLowerCase()}`) });
export default multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: (req, file, cb) => file.mimetype.startsWith('image/') ? cb(null, true) : cb(new AppError('Only image files are allowed', 400)) });
