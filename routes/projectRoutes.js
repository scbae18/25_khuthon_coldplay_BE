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
  updateProjectFunding,
  joinProject
} = require('../controllers/projectController');
const {
  getFundProjects,
  getPlanner
} = require('../controllers/fundController');
const Planner = require('../models/Planner');

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: 새 프로젝트 등록 (팀 모집 포함)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - teamRecruit
 *             properties:
 *               title:
 *                 type: string
 *                 example: 도시 속의 텃밭 프로젝트
 *               description:
 *                 type: string
 *                 example: 버려진 옥상에서 상추 키우기
 *               teamRecruit:
 *                 type: object
 *                 example:
 *                   브랜딩: 2
 *                   일꾼: 3
 *                   펀딩자: 1
 *                 description: 모집하려는 역할과 인원 수
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

/**
 * @swagger
 * /projects/{id}/join:
 *   patch:
 *     summary: 프로젝트 팀 참가
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 프로젝트 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: 브랜딩
 *     responses:
 *       200:
 *         description: 참가 성공
 *       400:
 *         description: 중복 참가 or 마감됨
 *       404:
 *         description: 프로젝트 없음
 */
router.patch('/:id/join', protect, joinProject);


/**
 * @swagger
 * /fund:
 *   get:
 *     summary: 펀딩 가능한 전체 프로젝트 조회
 *     tags: [Funding]
 *     responses:
 *       200:
 *         description: 성공적으로 프로젝트 리스트 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "665123456789abcdef123456"
 *                   title:
 *                     type: string
 *                     example: "친환경 당근 농장"
 *                   description:
 *                     type: string
 *                     example: "경남 밀양에서 당근을 재배합니다."
 *                   currentFund:
 *                     type: number
 *                     example: 2000000
 *                   participantCount:
 *                     type: number
 *                     example: 5
 *                   BuildSuccess:
 *                     type: boolean
 *                     example: true
 *                   owner:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: "홍길동"
 */


router.get('fund/:id',getPlanner);

/**
 * @swagger
 * /fund/{id}:
 *   get:
 *     summary: 특정 프로젝트의 계획서 조회
 *     tags: [Funding]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 조회할 프로젝트의 ObjectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 프로젝트에 연결된 계획서 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   goal:
 *                     type: string
 *                     example: "친환경 농산물을 생산하여 저렴하게 판매"
 *                   crop:
 *                     type: string
 *                     example: "당근"
 *                   region:
 *                     type: string
 *                     example: "경남 밀양시"
 *                   budget:
 *                     type: number
 *                     example: 20000000
 *                   creator:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: "홍길동"
 *                       email:
 *                         type: string
 *                         example: "hong@example.com"
 *                   nbtiRef:
 *                     type: object
 *                     properties:
 *                       nbti:
 *                         type: string
 *                         example: "PDXT"
 *                       nbti_name:
 *                         type: string
 *                         example: "토마토형"
 *                       explain:
 *                         type: string
 *                         example: "팀과 함께 빠르게 움직이는 테크농업 CEO형."
 *       404:
 *         description: 해당 프로젝트의 계획서가 없음
 *       500:
 *         description: 서버 오류로 인해 계획서 조회 실패
 */
router.get('/fund', getFundProjects);

module.exports = router;