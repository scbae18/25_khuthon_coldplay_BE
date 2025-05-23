const Planner = require('../models/Planner');

exports.createPlanner = async (req, res) => {
  try {
    const { goal, crop, region, budget, nbti } = req.body;
    const userId = req.user.id;

    if (!goal || !crop || !region || !budget || !nbti) {
      return res.status(400).json({ message: '모든 필드를 입력해야 합니다.' });
    }

    const planner = await Planner.create({
      goal,
      crop,
      region,
      budget,
      nbti,
      projectRef:'681e81778df0748267e4fa0d',
      creator: userId
    });

    res.status(201).json(planner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '계획서 저장 중 오류 발생' });
  }
};
