// commentResolvers.js
const Comment = require('../models/Comment');

module.exports = {
    Query: {
        getCommentsByTask: async (_, { taskId }) =>
            await Comment.find({ taskId }).populate('author mentions'),

        getComment: async (_, { id }) =>
            await Comment.findById(id).populate('author mentions')
    },

    Mutation: {
        addComment: async (_, { input }) => {
            const comment = new Comment(input);
            return await comment.save();
        },

        updateComment: async (_, { id, input }) => {
            const updated = await Comment.findByIdAndUpdate(id, {
                ...input,
                isEdited: true
            }, { new: true });
            return updated;
        },

        deleteComment: async (_, { id }) => {
            await Comment.findByIdAndDelete(id);
            return true;
        }
    }
};
