// Board.js
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    columns: [
        {
            name: { type: String, required: true },
            order: { type: Number, required: true }
        }
    ],
    isDefault: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
