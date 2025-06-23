// Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startDate: Date,
    endDate: Date,
    isArchived: { type: Boolean, default: false },
    visibility: { type: String, enum: ['private', 'team', 'public'], default: 'private' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
