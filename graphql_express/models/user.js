var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  age: Number,
  posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
  // comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

module.exports = mongoose.model("user", userSchema)
