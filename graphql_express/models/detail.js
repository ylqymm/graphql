var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var detailSchema = new Schema({
   "name":String,
   "age":Number,
   "sex":String,
   "address":String,
   "testId":{type: Schema.Types.ObjectId, ref: 'tests'}
   // "testId":String
});

module.exports = mongoose.model("details", detailSchema)