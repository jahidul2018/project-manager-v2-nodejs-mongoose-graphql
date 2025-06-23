// activityResolvers.js
const Activity = require('../models/Activity');

module.exports = {
    Query: {
        getActivitiesByProject: async (_, { projectId }) =>
            await Activity.find({ projectId }).populate('user').sort({ createdAt: -1 }),

        getActivity: async (_, { id }) =>
            await Activity.findById(id).populate('user')
    },

    Mutation: {
        addActivity: async (_, { input }) => {
            const activity = new Activity(input);
            return await activity.save();
        },

        deleteActivity: async (_, { id }) => {
            await Activity.findByIdAndDelete(id);
            return true;
        }
    }
};

