const Board = require('../models/Board');

const createBoard = async (input) => {
    const board = new Board(input);
    return await board.save();
};

const getBoardsByProject = async (projectId) => {
    return await Board.find({ projectId }).populate('projectId');
};

const getBoardById = async (id) => {
    return await Board.findById(id).populate('projectId');
};

const updateBoard = async (id, updateData) => {
    return await Board.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBoard = async (id) => {
    return await Board.findByIdAndDelete(id);
};

module.exports = {
    createBoard,
    getBoardsByProject,
    getBoardById,
    updateBoard,
    deleteBoard,
};
