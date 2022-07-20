const Board = require("../models/board");
const Section = require("../models/section");
const Task = require("../models/task");
const board = {
  gets: async (req, res) => {
    try {
      const boards = await Board.find({ user: req.user._id }).sort("-position");
      res.json(boards);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const boardsCount = await Board.find().count();
      const board = await Board.create({
        user: req.user._id,
        position: boardsCount > 0 ? boardsCount : 0,
      });
      res.status(201).json(board);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getFavourites: async (req, res) => {
    try {
      const favourites = await Board.find({
        user: req.user._id,
        favourite: true,
      }).sort("-favouritePosition");
      res.json(favourites);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateFavouritePosition: async (req, res) => {
    try {
      const { boards } = req.body;
      for (const key in boards.reverse()) {
        const board = boards[key];
        await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
      }
      res.json("updated");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const board = await Board.findOne({ user: req.user._id, _id: id });
      if (!board) return res.status(400).json("Board not found");
      const sections = await Section.find({ board: id });
      for (const section of sections) {
        const tasks = await Task.find({ section: section.id })
          .populate("section")
          .sort("-position");
        section._doc.tasks = tasks;
      }
      board._doc.sections = sections;
      res.json(board);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const sections = await Section.find({ board: id });
      for (const section of sections) {
        await Task.deleteMany({ section: section.id });
      }
      await Section.deleteMany({ board: id });

      const currentBoard = await Board.findById(id);

      if (currentBoard.favourite) {
        const favourites = await Board.find({
          user: currentBoard.user,
          favourite: true,
          _id: { $ne: id },
        }).sort("favouritePosition");

        for (const key in favourites) {
          const element = favourites[key];
          await Board.findByIdAndUpdate(element.id, {
            $set: { favouritePosition: key },
          });
        }
      }

      await Board.deleteOne({ _id: id });

      const boards = await Board.find().sort("position");
      for (const key in boards) {
        const board = boards[key];
        await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
      }

      res.status(200).json("deleted");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, favourite } = req.body;
      if (title === "") req.body.title = "Untitled";
      if (description === "") req.body.description = "Add description here";
      const currentBoard = await Board.findById(id);
      if (!currentBoard) return res.status(400).json("Board not found");

      if (favourite !== undefined && currentBoard.favourite !== favourite) {
        const favourites = await Board.find({
          user: currentBoard.user,
          favourite: true,
          _id: { $ne: id },
        }).sort("favouritePosition");
        if (favourite) {
          req.body.favouritePosition =
            favourites.length > 0 ? favourites.length : 0;
        } else {
          for (const key in favourites) {
            const element = favourites[key];
            await Board.findByIdAndUpdate(element.id, {
              $set: { favouritePosition: key },
            });
          }
        }
      }

      const board = await Board.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json(board);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updatePosition: async (req, res) => {
    try {
      const { boards } = req.body;
      for (const key in boards.reverse()) {
        const board = boards[key];
        await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
      }
      res.json("updated");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = board;
