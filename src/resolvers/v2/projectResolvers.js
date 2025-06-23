// projectResolvers.js
const Project = require('../models/Project');
const User = require('../models/User');

module.exports = {
    Query: {
        getProjects: async () => await Project.find().populate('owner members'),
        getProject: async (_, { id }) => await Project.findById(id).populate('owner members')
    },

    Mutation: {
        addProject: async (_, { input }) => {
            const project = new Project(input);
            return await project.save();
        },

        updateProject: async (_, { id, input }) => {
            return await Project.findByIdAndUpdate(id, input, { new: true });
        },

        deleteProject: async (_, { id }) => {
            await Project.findByIdAndDelete(id);
            return true;
        }
    }
};
