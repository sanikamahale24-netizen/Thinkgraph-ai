const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  firebaseUid: { type: String, unique: true, sparse: true },
  plan: { type: String, enum: ['free', 'pro'], default: 'free' },
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)