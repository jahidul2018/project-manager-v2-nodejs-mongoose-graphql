// Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ['task_assigned', 'comment_mention', 'deadline_approaching', 'project_update', 'custom'],
        default: 'custom'
    },
    link: String, // URL or internal route to related item
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
