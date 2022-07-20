const Task = require("../models/task");
const Section = require("../models/section");
const task = {
  create: async (req, res) => {
    try {
      const { sectionId } = req.body;
      const section = await Section.findById(sectionId);
      const tasksCount = await Task.find({ section: sectionId }).count();
      const task = await Task.create({
        section: sectionId,
        position: tasksCount > 0 ? tasksCount : 0,
      });
      task._doc.section = section;
      res.json(task);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const currentTask = await Task.findById(id);
      await Task.deleteOne({ _id: id });
      const tasks = await Task.find({ section: currentTask.section }).sort(
        "postition"
      );
      for (const key in tasks) {
        await Task.findByIdAndUpdate(tasks[key].id, {
          $set: { position: key },
        });
      }
      res.status(200).json("deleted");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updatePosition: async (req, res) => {
    try {
      const {
        resourceList,
        destinationList,
        resourceSectionId,
        destinationSectionId,
      } = req.body;
      const resourceListReverse = resourceList.reverse();
      const destinationListReverse = destinationList.reverse();
      if (resourceSectionId !== destinationSectionId) {
        for (const key in resourceListReverse) {
          await Task.findByIdAndUpdate(resourceListReverse[key].id, {
            $set: {
              section: resourceSectionId,
              position: key,
            },
          });
        }
      }
      for (const key in destinationListReverse) {
        await Task.findByIdAndUpdate(destinationListReverse[key].id, {
          $set: {
            section: destinationSectionId,
            position: key,
          },
        });
      }
      res.status(200).json("updated");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = task;
