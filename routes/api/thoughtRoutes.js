const router = require("express").Router();
//getting controller functions
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");
//assign getThoughts to GET method `http://localhost:3001/api/thoughts/`
//assign createThought to POST method `http://localhost:3001/api/thoughts/`
router.route("/").get(getThoughts).post(createThought);

//assign getOneThught to GET method `http://localhost:3001/api/thoughts/:thoughtId` to view thought by ID
//assign updateThought to PUT method `http://localhost:3001/api/thoughts/:thoughtId`  to update thought by ID
//assign deleteThought to DELETE method `http://localhost:3001/api/thoughts/:thoughtId`  to delete thought by ID
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

//assign addReaction to POST method `http://localhost:3001/api/thoughts/:thoughtId/reactions` to add reaction by thought ID

router.route("/:thoughtId/reactions").post(addReaction);

//assign removeReaction to DELETE method `http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId` to delete reaction by thoughtID and reactionID
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
