const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { title, description, teamType } = req.body;
  const project = await Project.create({
    owner: req.user.id,
    title,
    description,
    teamType
  });
  res.status(201).json(project);
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
  res.json(project);
};

exports.updateProjectFunding = async (req, res) => {
  const { amount } = req.body; // amount: 추가 펀딩 금액
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });

  project.currentFund += amount;
  project.participantCount += 1;
  await project.save();

  res.json(project);
};
