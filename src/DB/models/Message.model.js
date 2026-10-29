import mongoose from 'mongoose';
const schema = new mongoose.Schema({ sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, body: { type: String, required: true, trim: true } }, { timestamps: true });
export default mongoose.model('Message', schema);
