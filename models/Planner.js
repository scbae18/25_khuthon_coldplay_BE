const mongoose = require('mongoose');

const plannerSchema = new mongoose.Schema({
  goal: { type: String, required: true },
  crop: { type: String, required: true },
  region: { type: String, required: true },
  budget: { type: Number, required: true },

  // 외래키들
  nbtiRef: { type: mongoose.Schema.Types.ObjectId, ref: 'NbtiResult', required: true },
  projectRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Planner', plannerSchema);
