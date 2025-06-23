// Subtask.js
const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isCompleted: { type: Boolean, default: false },
    notes: String,
    dueDate: Date,
    order: Number
}, { timestamps: true });

module.exports = mongoose.model('Subtask', subtaskSchema);
