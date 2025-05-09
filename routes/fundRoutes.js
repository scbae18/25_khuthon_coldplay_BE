/**
 * @swagger
 * tags:
 *   name: Funds
 *   description: 농사 펀딩 프로젝트 관련 API
 */

const express = require('express');
const router = express.Router();
const {
  getFundProjects,
  getPlanner
} = require('../controllers/fundController');

router.get('/', getFundProjects);

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


router.get('/:id',getPlanner);

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


module.exports = router;