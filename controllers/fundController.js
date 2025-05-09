const Project = require('../models/Project');
const Planner = require('../models/Planner');
const mongoose = require('mongoose');

// 전체 프로젝트 목록 조회
exports.getFundProjects = async (req, res) => {
    try {
      const projects = await Project.find({BuildSuccess:true}).populate('owner', 'name').populate('plannerRef');
      res.json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '프로젝트 목록 조회 실패' });
    }
  };

exports.getPlanner = async(req, res) => {
    try{
        const planner = await Planner.find({projectRef: req.params.id}).populate('creator', 'name email');

      res.json(planner)
    }catch (err){
        console.error(err);
        res.status(500).json({ message : '계획서 조회 실패' });
    }
}
  
  // 펀딩 현황 업데이트
//   exports.updateProjectFunding = async (req, res) => {
//     try {
//       const { amount } = req.body;
//       const project = await Project.findById(req.params.id);
//       if (!project) {
//         return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
//       }
  
//       project.currentFund = (project.currentFund || 0) + amount;
//       project.participantCount = (project.participantCount || 0) + 1;
//       await project.save();
  
//       res.json(project);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: '펀딩 업데이트 실패' });
//     }
//   };
