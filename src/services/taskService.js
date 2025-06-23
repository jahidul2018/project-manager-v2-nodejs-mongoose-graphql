const Task = require('../models/Task');

const createTask = async (input) => {
    const task = new Task(input);
    return await task.save();
};

const getTasksByProject = async (projectId) => {
    return await Task.find({ projectId }).populate('assignedTo').populate('boardId');
};

const getTaskById = async (id) => {
    return await Task.findById(id).populate('assignedTo').populate('boardId');
};

module.exports = {
    createTask,
    getTasksByProject,
    getTaskById,
};
