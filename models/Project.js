const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
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
    teamMembers: {
      type: Map,
      of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: {}
    },
  
    currentFund: { type: Number, default: 0 },
    participantCount: { type: Number, default: 0 },
  
    createdAt: {
      type: Date,
      default: Date.now
    },

    BuildSuccess:{
        type: Boolean,
        default: false
    }

  });  

module.exports = mongoose.model('Project', projectSchema);
