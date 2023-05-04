const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [//regex patters vaildaes email address
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);//virtual to get number of friends as this field is not in database
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

const User = model("user", userSchema);

module.exports = User;
