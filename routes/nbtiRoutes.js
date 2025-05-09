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
 *     summary: 선택한 역할에 맞는 NBTI 질문 목록 조회
 *     tags: [NBTI]
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *         description: "사용자 선택 역할 (예: 농부, 브랜드매니저, 일꾼 등)"
 *     responses:
 *       200:
 *         description: 역할별 질문 리스트 반환
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
 *                     example: 밭 고르기는 직접 눈으로 확인해야 한다.
 */
router.get('/questions', getQuestions);

/**
 * @swagger
 * /nbti/submit:
 *   post:
 *     summary: NBTI 응답 제출 및 결과 생성 (역할 기반)
 *     tags: [NBTI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - answers
 *             properties:
 *               role:
 *                 type: string
 *                 example: 농부
 *               answers:
 *                 type: array
 *                 description: 역할별 질문에 대한 응답 배열
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: 밭 고르기는 직접 눈으로 확인해야 한다.
 *                     value:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: 역할 이름을 기반으로 결과 문자열 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: 농부형
 */
router.post('/submit', protect, submitAnswers);

/**
 * @swagger
 * /nbti/result:
 *   get:
 *     summary: 내 NBTI 검사 결과 조회
 *     tags: [NBTI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 저장된 검사 결과 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   example: 브랜드매니저
 *                 result:
 *                   type: string
 *                   example: 브랜드매니저형
 *       404:
 *         description: 결과 없음
 */
router.get('/result', protect, getResult);

module.exports = router;
