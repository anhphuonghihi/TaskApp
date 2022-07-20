const Section = require("../models/section");
const Task = require("../models/task");
const section = {
  create: async (req, res) => {
    try {
      const { boardId } = req.params;
      const section = await Section.create({ board: boardId });
      section._doc.tasks = [];
      res.json(section);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Task.deleteMany({ section: id });
      await Section.deleteOne({ _id: id });
      res.json("deleted");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const section = await Section.findByIdAndUpdate(id, {
        $set: req.body,
      });
      section._doc.tasks = [];
      res.status(200).json(section);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = section;
