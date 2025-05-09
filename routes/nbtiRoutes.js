/**
 * @swagger
 * tags:
 *   name: NBTI
 *   description: 농비티아이 검사 관련 API
 */

const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getQuestions,
  submitAnswers,
  getResult
} = require('../controllers/nbtiController');

/**
 * @swagger
 * /nbti/questions:
 *   get:
 *     summary: NBTI 질문 목록 조회
 *     tags: [NBTI]
 *     responses:
 *       200:
 *         description: 질문 리스트 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   question:
 *                     type: string
 *                     example: 혼자 농사짓는 걸 좋아한다.
 *                   type:
 *                     type: string
 *                     example: I
 */
router.get('/questions', getQuestions);

/**
 * @swagger
 * /nbti/submit:
 *   post:
 *     summary: NBTI 응답 제출 및 결과 도출
 *     tags: [NBTI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     value:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: 결과 유형 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: ISTJ
 */
router.post('/submit', protect, submitAnswers);

/**
 * @swagger
 * /nbti/result:
 *   get:
 *     summary: 내 NBTI 결과 조회
 *     tags: [NBTI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 결과 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 6648d6fca73112039c5b0721
 *                 result:
 *                   type: string
 *                   example: ENFP
 *       404:
 *         description: 결과 없음
 */
router.get('/result', protect, getResult);

module.exports = router;
