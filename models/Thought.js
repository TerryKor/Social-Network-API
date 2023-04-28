const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment")

const thoughtSchema = new Schema(
  {
    thoughtText: { String, required: true, minlength: 1, maxlength: 280 },

    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (date) => {return moment(date).format("MM/DD/YYYY hh:mm:ss")}
    },
    username: {
      //(The user that created this thought)
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return `${this.reactions.length}`;
  });

  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;