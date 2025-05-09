const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const NbtiResult = require('../models/NbtiResult');

// 🔐 JWT 토큰 생성
const generateToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ✅ 회원가입
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // 필수값 확인
  if (!name || !email || !password) {
    return res.status(400).json({ message: '이름, 이메일, 비밀번호 모두 필요합니다.' });
  }

  // 중복 사용자 확인
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 생성
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // 토큰 발급 및 응답
  const token = generateToken(user);
  res.status(201).json({ token });
};

// ✅ 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 사용자 조회
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
  }

  // 비밀번호 검증
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
  }

  // 응답
  res.json({
    user: { id: user._id, email: user.email },
    token: generateToken(user)
  });
};

// ✅ 내 정보 조회 (마이페이지)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const nbti = await NbtiResult.findOne({ userId: req.user.id });

    res.json({
      name: user.name,
      email: user.email,
      nbti: nbti ? nbti.result : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '사용자 정보 조회 실패' });
  }
};
