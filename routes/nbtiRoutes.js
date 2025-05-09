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
 *     summary: 전체 NBTI 질문 목록 조회
 *     tags: [NBTI]
 *     responses:
 *       200:
 *         description: NBTI 질문 리스트 반환
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
 *                     example: 수익보다 토양을 지키는 게 더 중요하다고 생각한다.
 *                   type:
 *                     type: string
 *                     description: 질문 유형 (S, P, I, D, C, X, A, T)
 *                     example: "S"
 */


router.get('/questions', getQuestions);

/**
 * @swagger
 * /nbti/submit:
 *   post:
 *     summary: NBTI 응답 제출 및 결과 생성
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
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 description: 질문에 대한 응답 배열
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - value
 *                     - type
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     value:
 *                       type: integer
 *                       enum: [1, 2, 3, 4]
 *                       example: 3
 *                     type:
 *                       type: string
 *                       description: "질문의 유형 (S, P, I, D, C, X, A, T 중 하나)"
 *                       example: "S"
 *           example:
 *             answers:
 *               - { "id": 1, "value": 1, "type": "S" }
 *               - { "id": 2, "value": 2, "type": "P" }
 *               - { "id": 3, "value": 4, "type": "S" }
 *               - { "id": 4, "value": 4, "type": "P" }
 *               - { "id": 5, "value": 4, "type": "I" }
 *               - { "id": 6, "value": 4, "type": "D" }
 *               - { "id": 7, "value": 3, "type": "I" }
 *               - { "id": 8, "value": 4, "type": "D" }
 *               - { "id": 9, "value": 4, "type": "C" }
 *               - { "id": 10, "value": 4, "type": "X" }
 *               - { "id": 11, "value": 1, "type": "C" }
 *               - { "id": 12, "value": 1, "type": "X" }
 *               - { "id": 13, "value": 3, "type": "A" }
 *               - { "id": 14, "value": 2, "type": "T" }
 *               - { "id": 15, "value": 3, "type": "A" }
 *               - { "id": 16, "value": 3, "type": "T" }
 *     responses:
 *       200:
 *         description: 계산된 NBTI 결과 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     nbti:
 *                       type: string
 *                       example: "PDXT"
 *                     nbti_name:
 *                       type: string
 *                       example: "토마토형"
 *                     explain:
 *                       type: string
 *                       example: "팀과 함께 빠르게 움직이는 테크농업 CEO형."
 *       400:
 *         description: answers가 누락되었을 경우
 *       500:
 *         description: 결과 저장 중 오류 발생
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
 *                 _id:
 *                   type: string
 *                   example: "6648f234afdf9c1e3c6c7a9a"
 *                 userId:
 *                   type: string
 *                   example: "6648f1a8afdf9c1e3c6c7a99"
 *                 result:
 *                   type: object
 *                   properties:
 *                     nbti:
 *                       type: string
 *                       example: "PDXT"
 *                     nbti_name:
 *                       type: string
 *                       example: "토마토형"
 *                     explain:
 *                       type: string
 *                       example: "팀과 함께 빠르게 움직이는 테크농업 CEO형."
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: 결과 없음
 */

router.get('/result', protect, getResult);

module.exports = router;
