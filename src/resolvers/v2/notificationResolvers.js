// notificationResolvers.js
const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');

module.exports = {

    getNotificationsByUser: async ({ userId }) => {
        return await notificationService.getNotificationsByUser(userId);
    },

    addNotification: async ({ input }) => {
        return await notificationService.addNotification(input);
    },

    markNotificationAsRead: async ({ id }) => {
        return await notificationService.markNotificationAsRead(id);
    },

};
