// subtaskResolvers.js
const Subtask = require('../models/Subtask');

module.exports = {
    Query: {
        getSubtasksByTask: async (_, { taskId }) =>
            await Subtask.find({ taskId }).populate('assignedTo'),

        getSubtask: async (_, { id }) =>
            await Subtask.findById(id).populate('assignedTo')
    },

    Mutation: {
        addSubtask: async (_, { input }) => {
            const subtask = new Subtask(input);
            return await subtask.save();
        },

        updateSubtask: async (_, { id, input }) => {
            return await Subtask.findByIdAndUpdate(id, input, { new: true });
        },

        deleteSubtask: async (_, { id }) => {
            await Subtask.findByIdAndDelete(id);
            return true;
        }
    }
};
