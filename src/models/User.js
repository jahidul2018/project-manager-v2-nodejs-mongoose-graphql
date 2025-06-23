// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true, sparse: true }, // optional
    address: String, // optional
    dateOfBirth: Date, // optional
    profilePicture: String, // optional
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastLogin: Date, // optional
    isActive: { type: Boolean, default: true }, // optional
    isEmailVerified: { type: Boolean, default: false }, // optional
    password: String, // hashed
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' }
});

module.exports = mongoose.model('User', userSchema);