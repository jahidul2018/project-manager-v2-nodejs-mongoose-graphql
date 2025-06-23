// projectResolvers.js
const Project = require('../models/Project');
const User = require('../models/User');
const projectService = require('../../services/projectService');

module.exports = {

    getProject: async ({ id }) => {
        return await projectService.getProjectById(id);
    },

    getProjects: async () => {
        return await projectService.getProjects();
    },

    addProject: async ({ input }) => {
        return await projectService.createProject(input);
    },

    // Query: {

    // },

    // Mutation: {

    // }

};
