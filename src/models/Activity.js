// Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // e.g., "created task", "updated status", "commented"
    entityType: { type: String, enum: ['Task', 'Project', 'Comment', 'Subtask'], required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // optional
    metadata: mongoose.Schema.Types.Mixed, // optional, for flexible context info
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
