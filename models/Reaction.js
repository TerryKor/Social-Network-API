const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId, //to check
    default: ()=> new Types.ObjectId(),//Default value is set to a new ObjectId
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
     get: (date) => {return moment(date).format("MM/DD/YYYY hh:mm:ss")}
  }
},
{//not sure if we need virtuals here
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

  const Reaction = model('reaction', reactionSchema);

  module.exports = Reaction;