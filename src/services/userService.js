const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (input) => {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = new User({ ...input, password: hashedPassword });
    return await user.save();
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    createUser,
    findUserByEmail,
    comparePasswords,
};
