const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Manager', 'Operator'], required: true },
  department: { type: String, enum: ['Assembly', 'Quality Control'], required: true }
});

module.exports = mongoose.model('User', userSchema);