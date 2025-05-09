const NbtiResult = require('../models/NbtiResult');
const roleQuestions = require('../data/roleQuestions');

// 🔹 역할별 질문 제공
exports.getQuestions = (req, res) => {
  const { role } = req.query;
  if (!role || !roleQuestions[role]) {
    return res.status(400).json({ message: '유효한 역할이 필요합니다.' });
  }
  res.json(roleQuestions[role]);
};

// 🔹 응답 제출 (GPT 없이 역할을 결과로 저장)
exports.submitAnswers = async (req, res) => {
  const { role, answers } = req.body;

  if (!role || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'role과 answers가 필요합니다.' });
  }

  try {
    const result = `${role}형`; // 예: '농부형', '브랜드매니저형'

    await NbtiResult.findOneAndUpdate(
      { userId: req.user.id },
      { role, result },
      { upsert: true, new: true }
    );

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '결과 저장 중 오류 발생' });
  }
};

// 🔹 결과 조회
exports.getResult = async (req, res) => {
  const result = await NbtiResult.findOne({ userId: req.user.id });
  if (!result) return res.status(404).json({ message: '결과 없음' });
  res.json(result);
};
