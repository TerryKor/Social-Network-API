const router = require("express").Router();
//getting controller functions
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
  addfriend,
  removeFriend,
} = require("../../controllers/userController");
//assign getAllUsers to GET method `http://localhost:3001/api/users`  to view all users
//assign createUser to POST method `http://localhost:3001/api/users/` to create user
router.route("/").get(getAllUsers).post(createUser);

//assign getOneUser to GET method `http://localhost:3001/api/users/:userId` to view user by ID
//assign updateUser to PUT method `http://localhost:3001/api/users/:userId`  to update user by ID
//assign deleteUser to DELETE method `http://localhost:3001/api/users/:userId` to delete user by ID
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

//assign addfriend to POST method `http://localhost:3001/api/users/:userId/friends/:friendId to add a friend by user ID and friend ID
//assign removeFriend to DELETE method `http://localhost:3001/api/users/:userId/friends/:friendId to remover a friend by user ID and friend ID
router.route("/:userId/friends/:friendId").post(addfriend).delete(removeFriend);
module.exports = router;
