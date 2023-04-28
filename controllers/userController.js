const { User, Thought } = require("../models");

module.exports = {
  //getting all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.jeson(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //getting one user
  async getOneUser(req, res) {
    try {
      const oneUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!oneUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(oneUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //creating one user
  async createUser(req, res) {
    try {
      const createOneUser = await User.create(req.body);
      res.json(createOneUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //deleting user and associated thoughts
  async deleteUser(req, res) {
    try {
      const deleteOneUserAndThought = await User.findOneAndDelete({
        _id: req.params.userdId,
      });
      if (!deleteOneUserAndThought) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      await Thought.deleteMany({
        _id: { $in: deleteOneUserAndThought.thoughts },
      });
      res.json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
