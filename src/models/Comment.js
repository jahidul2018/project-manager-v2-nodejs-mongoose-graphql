// Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // optional tagging
    attachments: [String], // optional: URLs or file references
    isEdited: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
