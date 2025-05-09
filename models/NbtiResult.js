const mongoose = require('mongoose');

const nbtiResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  result: { type: String, required: true }
});

module.exports = mongoose.model('NbtiResult', nbtiResultSchema);
