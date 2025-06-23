// activityResolvers.js
const Activity = require('../models/Activity');
const activityService = require('../services/activityService');

module.exports = {

    getActivitiesByProject: async ({ projectId }) => {
        return await activityService.getActivitiesByProject(projectId);
    },

    addActivity: async ({ input }) => {
        return await activityService.addActivity(input);
    },

};

