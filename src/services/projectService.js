const Project = require('../models/Project');

const createProject = async (input) => {
    const project = new Project(input);
    return await project.save();
};

const getProjects = async () => {
    return await Project.find().populate('owner members');
};

const getProjectById = async (id) => {
    return await Project.findById(id).populate('owner members');
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
};
