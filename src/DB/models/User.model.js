import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: false, select: false }, phone: { type: String, required: false, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, confirmed: { type: Boolean, default: false },
  otpHash: String, otpExpires: Date, failedAttempts: { type: Number, default: 0 }, banUntil: Date,
  twoStepEnabled: { type: Boolean, default: false }, image: String, changeCredentialsTime: Date
}, { timestamps: true });
export default mongoose.model('User', userSchema);
