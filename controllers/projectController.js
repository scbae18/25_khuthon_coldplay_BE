const Project = require('../models/Project');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.createProject = async (req, res) => {
    try {
      const { title, description, teamRecruit } = req.body;
  
      if (!title || !description || !teamRecruit) {
        return res.status(400).json({ message: '제목, 설명, 모집 인원은 필수입니다.' });
      }
  
      const teamCurrent = {};
      const teamMembers = {};
  
      for (const role of Object.keys(teamRecruit)) {
        teamCurrent[role] = 0;
        teamMembers[role] = [];
      }
  
      const project = await Project.create({
        title,
        description,
        owner: req.user.id,
        teamRecruit,
        teamCurrent,
        teamMembers
      });
  
      res.status(201).json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '프로젝트 생성 중 오류 발생' });
    }

    exports.addFarmPlan = async (req, res) => {
        try {
          const { location, crops, fundingGoal } = req.body;
          const project = await Project.findById(req.params.id);
      
          if (!project) {
            return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
          }
      
          project.farmPlan = {
            location,
            crops,
            fundingGoal
          };
          project.isCompleted = true;
      
          await project.save();
      
          res.json({
            message: '농사 계획이 성공적으로 등록되었습니다.',
            project
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: '농사 계획 등록 중 오류 발생' });
        }
      };
      
  };
  
  

// 전체 프로젝트 목록 조회
exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find({BuildSuccess:false}).populate('owner', 'name');
      res.json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '프로젝트 목록 조회 실패' });
    }
  };
  
  // 특정 프로젝트 상세 조회
exports.getProjectById = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id).populate('owner', 'name');
      if (!project) {
        return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
      }
  
      const teamRecruit = Object.fromEntries(project.teamRecruit || []);
      const teamCurrent = Object.fromEntries(project.teamCurrent || []);
      const teamMembersRaw = Object.fromEntries(project.teamMembers || []);
  
      const populatedTeamMembers = {};
  
      for (const [role, userIds] of Object.entries(teamMembersRaw)) {
        const users = await User.find({ _id: { $in: userIds } }, 'name');
        populatedTeamMembers[role] = users.map(user => ({
          _id: user._id,
          name: user.name
        }));
      }
  
      res.json({
        _id: project._id,
        title: project.title,
        description: project.description,
        owner: project.owner,
        teamRecruit,
        teamCurrent,
        currentFund: project.currentFund,
        participantCount: project.participantCount,
        createdAt: project.createdAt,
        teamMembers: populatedTeamMembers
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '프로젝트 조회 실패' });
    }
  };
    
  // 펀딩 현황 업데이트
  exports.updateProjectFunding = async (req, res) => {
    try {
      const { amount } = req.body;
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
      }
  
      project.currentFund = (project.currentFund || 0) + amount;
      project.participantCount = (project.participantCount || 0) + 1;
      await project.save();
  
      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '펀딩 업데이트 실패' });
    }
  };

  exports.joinProject = async (req, res) => {
    try {
      const { role } = req.body;
      const userId = req.user.id;
  
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
      }
  
      // teamRecruit 변환
      const teamRecruit = Object.fromEntries(project.teamRecruit || []);
      const recruitLimit = teamRecruit[role] || 0;
  
      // teamMembers 변환
      const teamMembers = Object.fromEntries(project.teamMembers || []);
      const currentMembers = teamMembers[role] || [];
  
      // 중복 참가 확인
      if (currentMembers.map(id => id.toString()).includes(userId.toString())) {
        return res.status(400).json({ message: '이미 해당 역할로 참가하셨습니다.' });
      }
  
      // 모집 인원 초과 확인
      if (currentMembers.length >= recruitLimit) {
        return res.status(400).json({ message: '해당 역할은 이미 마감되었습니다.' });
      }
  
      // ✅ 유저 ID 추가 (ObjectId로 변환)
      const objectId = new mongoose.Types.ObjectId(userId);
      currentMembers.push(objectId);
      teamMembers[role] = currentMembers;
      project.teamMembers = teamMembers;
  
      // teamCurrent 업데이트
      const teamCurrent = Object.fromEntries(project.teamCurrent || []);
      teamCurrent[role] = (teamCurrent[role] || 0) + 1;
      project.teamCurrent = teamCurrent;
  
      await project.save();
  
      // 사용자 참여 프로젝트 정보 추가
      const user = await User.findById(userId);
      const alreadyJoined = user.joinedProjects?.some(
        (p) => p.project.toString() === project._id.toString()
      );
  
      if (!alreadyJoined) {
        user.joinedProjects.push({ project: project._id, role });
        await user.save();
      }
  
      // 응답
      res.json({
        message: `${role} 역할로 참가 완료`,
        projectId: project._id,
        teamCurrent,
        teamMembers
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '팀 참가 처리 중 오류' });
    }
  };

 