const questions = require('../data/questions');
const NbtiResult = require('../models/NbtiResult');

// 🔹 질문지 제공
exports.getQuestions = (req, res) => {
  res.json(questions);
};

// 🔹 응답 제출
exports.submitAnswers = async (req, res) => {
  const { answers } = req.body; // [{ id: 1, value: true }, ...]
  const counts = { I: 0, E: 0, P: 0, J: 0, S: 0, N: 0, T: 0, F: 0 };

  for (const answer of answers) {
    const q = questions.find(q => q.id === answer.id);
    if (!q) continue;
    const target = answer.value ? q.type : getOpposite(q.type);
    counts[target]++;
  }

  const result = `${counts.I > counts.E ? 'I' : 'E'}${counts.S > counts.N ? 'S' : 'N'}${counts.T > counts.F ? 'T' : 'F'}${counts.J > counts.P ? 'J' : 'P'}`;

  await NbtiResult.findOneAndUpdate(
    { userId: req.user.id },
    { result },
    { upsert: true, new: true }
  );

  res.json({ result });
};

// 🔹 결과 조회
exports.getResult = async (req, res) => {
  const result = await NbtiResult.findOne({ userId: req.user.id });
  if (!result) return res.status(404).json({ message: '결과 없음' });
  res.json(result);
};

// 🔧 반대 항목 계산
function getOpposite(type) {
  const map = { I: 'E', E: 'I', P: 'J', J: 'P', S: 'N', N: 'S', T: 'F', F: 'T' };
  return map[type] || '';
}
