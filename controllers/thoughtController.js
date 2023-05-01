const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const getThoughts = await Thought.find();
      res.json(getThoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getOneThought(req, res) {
    try {
      const getThought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!getThought) {
        return res
          .status(404)
          .json({ message: "No thought was found with that ID!" });
      }
      res.json(getThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but found no user with that id" });
      }
      res.json("Thought created!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(rea, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughtToDelete = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thoughtToDelete) {
        return res
          .status(404)
          .json({ message: "No thought to delete with that ID" });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thpughtId } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with that ID!" });
      }
      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ mesasage: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
