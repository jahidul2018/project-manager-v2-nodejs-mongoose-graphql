// taskResolvers.js
const Task = require('../models/Task');
const taskService = require('../../services/taskService');

const { pubsub, EVENTS } = require('../pubsub');

const roleCheck = require('../middleware/roles');

const adminOnlyMutation = roleCheck('admin')(async (_, args, context) => {
    // your mutation logic
    addTask: async (_, { input }) => {
        const task = await new Task(input).save();
        pubsub.publish(EVENTS.TASK.CREATED, { taskCreated: task });
        return task;
    }

});



module.exports = {
    Query: {
        getTasksByProject: async (_, { projectId }) =>
            await Task.find({ projectId }).populate('assignedTo projectId boardId'),

        getTasksByBoard: async (_, { boardId }) =>
            await Task.find({ boardId }).populate('assignedTo projectId boardId'),

        getTask: async (_, { id }) =>
            await Task.findById(id).populate('assignedTo projectId boardId')
    },

    Mutation: {
        addTask: async (_, { input }) => {
            const task = new Task(input);
            return await task.save();
        },

        updateTask: async (_, { id, input }) => {
            return await Task.findByIdAndUpdate(id, input, { new: true });
        },

        deleteTask: async (_, { id }) => {
            await Task.findByIdAndDelete(id);
            return true;
        }
    }
};

// getTask: async ({ id }) => {
//     return await taskService.getTaskById(id);
// },

//     getTasksByProject: async ({ projectId }) => {
//         return await taskService.getTasksByProject(projectId);
//     },

//         addTask: async ({ input }) => {
//             return await taskService.createTask(input);
//         },
