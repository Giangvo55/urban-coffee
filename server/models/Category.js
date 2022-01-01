const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    title: {
      type: String,
      required: 'This field is required.'
    },
    img: {
      type: String,
      required: 'This field is required.'
    },
    tag: {
      type: String
    }
  });
  
module.exports = mongoose.model('Category', categorySchema);