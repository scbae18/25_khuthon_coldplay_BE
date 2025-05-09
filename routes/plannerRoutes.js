const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { createPlanner } = require('../controllers/plannerController');

/**
 * @swagger
 * /planners:
 *   post:
 *     summary: 계획서 생성
 *     tags: [Planners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [goal, crop, region, budget, nbtiRef, projectRef]
 *             properties:
 *               goal:
 *                 type: string
 *                 example: 도시 농업 성공시키기
 *               crop:
 *                 type: string
 *                 example: 상추
 *               region:
 *                 type: string
 *                 example: 강원도 삼척시
 *               budget:
 *                 type: number
 *                 example: 500000
 *               nbtiRef:
 *                 type: string
 *                 example: "SICA"
 *               projectRef:
 *                 type: string
 *                 example: 664b2222c72f3c8d215a9bbb
 *     responses:
 *       201:
 *         description: 계획서 생성 완료
 */
router.post('/', protect, createPlanner);

module.exports = router;
