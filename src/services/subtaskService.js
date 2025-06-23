const Subtask = require('../models/Subtask');

const createSubtask = async (input) => {
    const subtask = new Subtask(input);
    return await subtask.save();
};

const getSubtasksByTask = async (taskId) => {
    return await Subtask.find({ taskId }).populate('assignedTo');
};

const getSubtaskById = async (id) => {
    return await Subtask.findById(id).populate('assignedTo');
};

module.exports = {
    createSubtask,
    getSubtasksByTask,
    getSubtaskById,
};
