// subtaskResolvers.js
const Subtask = require('../models/Subtask');
const subtaskService = require('../../services/subtaskService');

module.exports = {

    getSubtasksByTask: async ({ taskId }) => {
        return await subtaskService.getSubtasksByTask(taskId);
    },

    addSubtask: async ({ input }) => {
        return await subtaskService.createSubtask(input);
    },
};
