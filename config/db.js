const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB 연결 완료');
  } catch (err) {
    console.error('❌ DB 연결 실패', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
