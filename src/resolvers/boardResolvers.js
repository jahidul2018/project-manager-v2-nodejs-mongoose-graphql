// boardResolvers.js
const Board = require('../models/Board');

module.exports = {
    Query: {
        getBoardsByProject: async (_, { projectId }) =>
            await Board.find({ projectId }).sort({ createdAt: 1 }),

        getBoard: async (_, { id }) =>
            await Board.findById(id)
    },

    Mutation: {
        addBoard: async (_, { input }) => {
            const board = new Board(input);
            return await board.save();
        },

        updateBoard: async (_, { id, input }) => {
            return await Board.findByIdAndUpdate(id, input, { new: true });
        },

        deleteBoard: async (_, { id }) => {
            await Board.findByIdAndDelete(id);
            return true;
        }
    }
};
