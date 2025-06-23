const ActivityLog = require('../models/ActivityLog');

const addActivity = async (input) => {
    const activity = new ActivityLog(input);
    return await activity.save();
};

const getActivitiesByProject = async (projectId) => {
    return await ActivityLog.find({ projectId }).populate('user').sort({ timestamp: -1 });
};

module.exports = {
    addActivity,
    getActivitiesByProject,
};
