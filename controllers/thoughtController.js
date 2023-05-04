const { Thought, User } = require("../models");

module.exports = {
  //controller to get all thoughts
  async getThoughts(req, res) {
    try {
      const getThoughts = await Thought.find();
      res.json(getThoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //controller to get one thought
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
  //controller to create a thought
  //thoughts are assosiated with user
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
  //controller to update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }, //$set operator is used to update a thought
        { runValidators: true, new: true } //runValidators is set to true so any validation runs and then set new to true so mongoose returns the updated document
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //controller to delete a thought
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
        { new: true } // we set new to true so mongoose returns updated User document with thought removed
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
  //controller to add a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } }, //adding reaction to thoughts reaction array because reaction is not an object
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
  //controller to remove reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
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
