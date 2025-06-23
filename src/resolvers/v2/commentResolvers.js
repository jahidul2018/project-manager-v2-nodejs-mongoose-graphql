// commentResolvers.js
const Comment = require('../models/Comment');
const commentService = require('../services/commentService');

module.exports = {

    getCommentsByTask: async ({ taskId }) => {
        return await commentService.getCommentsByTask(taskId);
    },

    addComment: async ({ input }, context) => {
        const authorId = context.req.user._id;
        return await commentService.addComment(input, authorId);
    },

};
