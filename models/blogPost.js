const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  publicationDate: Date,
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
