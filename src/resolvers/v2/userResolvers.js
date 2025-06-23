const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = {

    registerUser: async ({ input }) => {
        return await userService.createUser(input);
    },

    login: async ({ input }) => {
        const user = await userService.findUserByEmail(input.email);
        if (!user) throw new Error('User not found');

        const valid = await userService.comparePasswords(input.password, user.password);
        if (!valid) throw new Error('Incorrect password');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return { token, user };
    },

    getUsers: async () => {
        return await userService.getAllUsers?.() || [];
    },

    // Query: {

    // },

    // Mutation: {

    // }
};
