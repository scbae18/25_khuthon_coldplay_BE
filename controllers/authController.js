const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });

  const user = await User.create({ email, password });
  res.status(201).json({
    user: { id: user._id, email: user.email },
    token: generateToken(user),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
  }

  res.json({
    user: { id: user._id, email: user.email },
    token: generateToken(user),
  });
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
