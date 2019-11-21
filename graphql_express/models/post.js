var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
    // comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
  });
  
module.exports = mongoose.model("post", postSchema)