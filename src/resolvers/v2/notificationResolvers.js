// notificationResolvers.js
const Notification = require('../models/Notification');

module.exports = {
    Query: {
        getNotificationsByUser: async (_, { userId }) =>
            await Notification.find({ recipient: userId }).sort({ createdAt: -1 }),

        getNotification: async (_, { id }) =>
            await Notification.findById(id)
    },

    Mutation: {
        addNotification: async (_, { input }) => {
            const notification = new Notification(input);
            return await notification.save();
        },

        markNotificationAsRead: async (_, { id }) => {
            return await Notification.findByIdAndUpdate(
                id,
                { isRead: true },
                { new: true }
            );
        },

        deleteNotification: async (_, { id }) => {
            await Notification.findByIdAndDelete(id);
            return true;
        }
    }
};
