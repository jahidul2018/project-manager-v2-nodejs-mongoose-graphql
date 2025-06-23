// Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['backlog', 'todo', 'in_progress', 'review', 'done'],
        default: 'backlog'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    dueDate: Date,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
    order: Number,
    tags: [String],
    isArchived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
