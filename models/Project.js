const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // 팀 모집 필드 추가
  teamRecruit: {
    type: Map,
    of: Number,
    default: {}
  },
  teamCurrent: {
    type: Map,
    of: Number,
    default: {}
  },

  // 기존 펀딩 관련
  currentFund: { type: Number, default: 0 },
  participantCount: { type: Number, default: 0 },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
