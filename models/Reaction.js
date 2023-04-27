const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId, //to check
    //default://Default value is set to a new ObjectId
  },
  reactionBody:{
    type:String,
    required:true,
    maxLength: 280,
  },
  username:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
    //Use a getter method to format the timestamp on query
    // get: (date) => {}
  }
},
{//not sure if we need virtuals here
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

  const Reaction = model('reaction', reactionSchema);

  module.exports = Reaction;