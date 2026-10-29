import User from '../../DB/models/User.model.js';
import Message from '../../DB/models/Message.model.js';
import AppError from '../../utils/AppError.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { success } from '../../utils/success.js';

export const send = asyncHandler(async (req, res) => {
  const receiver = await User.findById(req.body.receiverId);
  if (!receiver) throw new AppError('Receiver not found', 404);
  if (receiver.id === req.user.id) throw new AppError('You cannot message yourself', 400);
  const message = await Message.create({ sender: req.user.id, receiver: receiver.id, body: req.body.body });
  success(res, { id: message.id, body: message.body, createdAt: message.createdAt }, 'Message sent', 201);
});

export const received = asyncHandler(async (req, res) => {
  const messages = await Message.find({ receiver: req.user.id }).select('-sender').sort({ createdAt: -1 });
  success(res, messages.map((message) => ({ id: message.id, body: message.body, createdAt: message.createdAt })));
});
