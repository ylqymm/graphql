var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
  })

module.exports = mongoose.model("comment", commentSchema)
   