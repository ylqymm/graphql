var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TestSchema = new Schema({
    "name": String,
    "title": String,
    "pass": String,
    // "details":{ type: Schema.Types.ObjectId, ref: 'details' }
    "details":String
});

module.exports = mongoose.model("tests", TestSchema)