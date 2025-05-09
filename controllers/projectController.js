const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, teamRecruit } = req.body;

    if (!title || !description || !teamRecruit) {
      return res.status(400).json({ message: '제목, 설명, 모집 인원은 필수입니다.' });
    }

    // 역할별 현재 인원을 0으로 초기화
    const teamCurrent = {};
    for (const [role, count] of Object.entries(teamRecruit)) {
      teamCurrent[role] = 0;
    }

    const project = await Project.create({
      title,
      description,
      owner: req.user.id, // protect 미들웨어 통해 인증된 사용자
      teamRecruit,
      teamCurrent
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '프로젝트 생성 중 오류 발생' });
  }
};

// 전체 프로젝트 목록 조회
exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find().populate('owner', 'name');
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
      res.json(project);
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
  
      // 🔧 teamRecruit 변환
      const teamRecruit = project.teamRecruit instanceof Map
        ? project.teamRecruit
        : new Map(Object.entries(project.teamRecruit || {}));
  
      const recruitLimit = teamRecruit.get(role) || 0;
  
      // 🔧 teamMembers 변환
      const teamMembers = project.teamMembers instanceof Map
        ? project.teamMembers
        : new Map(Object.entries(project.teamMembers || {}));
  
      const currentMembers = teamMembers.get(role) || [];
  
      if (currentMembers.includes(userId)) {
        return res.status(400).json({ message: '이미 해당 역할로 참가하셨습니다.' });
      }
  
      if (currentMembers.length >= recruitLimit) {
        return res.status(400).json({ message: '해당 역할은 이미 마감되었습니다.' });
      }
  
      // 역할에 유저 추가
      currentMembers.push(userId);
      teamMembers.set(role, currentMembers);
      project.teamMembers = teamMembers;
  
      // 🔧 teamCurrent 변환
      const teamCurrent = project.teamCurrent instanceof Map
        ? project.teamCurrent
        : new Map(Object.entries(project.teamCurrent || {}));
  
      const currentCount = teamCurrent.get(role) || 0;
      teamCurrent.set(role, currentCount + 1);
      project.teamCurrent = teamCurrent;
  
      await project.save();
  
      res.json({
        message: `${role} 역할로 참가 완료`,
        projectId: project._id,
        teamCurrent: Object.fromEntries(project.teamCurrent),
        teamMembers: Object.fromEntries(project.teamMembers)
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '팀 참가 처리 중 오류' });
    }
  };