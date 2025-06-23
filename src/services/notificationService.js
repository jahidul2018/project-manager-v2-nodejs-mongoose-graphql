const Notification = require('../models/Notification');

const addNotification = async (input) => {
    const notification = new Notification(input);
    return await notification.save();
};

const getNotificationsByUser = async (userId) => {
    return await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
};

const markNotificationAsRead = async (id) => {
    return await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
};

module.exports = {
    addNotification,
    getNotificationsByUser,
    markNotificationAsRead,
};
