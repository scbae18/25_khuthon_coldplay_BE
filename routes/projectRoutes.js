/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: 농사 펀딩 프로젝트 관련 API
 */

const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectFunding
} = require('../controllers/projectController');

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: 새 프로젝트 등록
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 도시 속의 텃밭 프로젝트
 *               description:
 *                 type: string
 *                 example: 버려진 옥상에서 상추 키우기
 *               teamType:
 *                 type: string
 *                 example: 브랜딩형
 *     responses:
 *       201:
 *         description: 등록된 프로젝트 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */
router.post('/', protect, createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: 모든 프로젝트 목록 조회
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: 프로젝트 리스트 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/', getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: 특정 프로젝트 상세 조회
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 프로젝트 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 프로젝트 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: 프로젝트를 찾을 수 없음
 */
router.get('/:id', getProjectById);

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: 펀딩 현황 업데이트 (참여)
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 프로젝트 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50000
 *     responses:
 *       200:
 *         description: 업데이트된 프로젝트 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: 프로젝트를 찾을 수 없음
 */
router.patch('/:id', updateProjectFunding);

module.exports = router;
