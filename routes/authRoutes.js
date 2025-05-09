const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 관련 API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: 배승찬
 *               email:
 *                 type: string
 *                 example: scbae18@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: 회원가입 성공 시 JWT 토큰 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: 입력값 부족 또는 중복 이메일
 */

router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: 내 계정 정보 조회
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 로그인한 사용자 정보와 농비티아이 결과 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: 배승찬
 *                 email:
 *                   type: string
 *                   example: scbae18@example.com
 *                 nbti:
 *                   type: string
 *                   example: 농부형
 *       401:
 *         description: 인증 실패 또는 토큰 없음
 */

router.get('/me', protect, getMe);

module.exports = router;
