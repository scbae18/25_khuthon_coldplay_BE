const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: { type: String, default: null }, 
  crops: { type: Object, default: {} }, 

  // ✅ 프로젝트 참여 기록
  joinedProjects: [
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      },
      role: {
        type: String
      }
    }
  ]
});

// 🔐 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
