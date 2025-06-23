const Comment = require('../models/Comment');

const addComment = async (input, authorId) => {
    const comment = new Comment({ ...input, author: authorId });
    return await comment.save();
};

const getCommentsByTask = async (taskId) => {
    return await Comment.find({ taskId }).populate('author').sort({ createdAt: -1 });
};

const getCommentById = async (id) => {
    return await Comment.findById(id).populate('author');
};

module.exports = {
    addComment,
    getCommentsByTask,
    getCommentById,
};
