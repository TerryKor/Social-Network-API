const { User, Thought } = require("../models");
const { findOneAndUpdate } = require("../models/User");

module.exports = {
  //getting all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
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
  //update user

  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updateUser) {
        return res
          .status(404)
          .json({ message: "No user with that ID to update" });
      }
      res.json(updateUser);
    } catch (err) {
      console.log(err);
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
        _id: req.params.userId,
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
  async addfriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that Id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json;
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID to update!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
