var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
  title: {
    type: String,
  },
  date: {
  	type: Date,
  },
  url: {
    type: String
  }
});

var Articles = mongoose.model('Saved', ArticlesSchema);
module.exports = Articles;
