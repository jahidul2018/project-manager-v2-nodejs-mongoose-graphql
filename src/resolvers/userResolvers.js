const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        getUsers: async () => await User.find(),
        getUser: async (_, { id }) => await User.findById(id)
    },

    Mutation: {
        registerUser: async (_, { input }) => {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const user = new User({ ...input, password: hashedPassword });
            return await user.save();
        },

        login: async (_, { input }) => {
            const user = await User.findOne({ email: input.email });
            if (!user) throw new Error('User not found');

            const isMatch = await bcrypt.compare(input.password, user.password);
            if (!isMatch) throw new Error('Invalid credentials');

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });

            return { token, user };
        },

        deleteUser: async (_, { id }) => {
            await User.findByIdAndDelete(id);
            return true;
        }
    }
};
