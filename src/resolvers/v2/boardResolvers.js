// boardResolvers.js
const Board = require('../models/Board');
const boardService = require('../services/boardService');

module.exports = {
    // Query
    getBoardsByProject: async ({ projectId }) => {
        return await boardService.getBoardsByProject(projectId);
    },

    getBoard: async ({ id }) => {
        return await boardService.getBoardById(id);
    },

    // Mutation
    addBoard: async ({ input }) => {
        return await boardService.createBoard(input);
    },

    updateBoard: async ({ id, input }) => {
        return await boardService.updateBoard(id, input);
    },

    deleteBoard: async ({ id }) => {
        await boardService.deleteBoard(id);
        return "Board deleted successfully";
    }
};

