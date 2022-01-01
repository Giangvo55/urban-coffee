const { Int32 } = require('mongodb');
const mongoose = require('mongoose');


const drinkSchema = new mongoose.Schema({
    name: {
      type: String,
      required: 'This field is required.'
    },
    price: {
      type: Number,
      required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
      },
    size: {
        type: String,
        required: 'This field is required.'
      },
    img: {
        type: Array,
        required: 'This field is required.'
      },
    category: {
        type: String,
        enum: ['Cà phê', 'Trà trái cây', 'Cà phê bột', 'Bánh-Snacks'],
        required: 'This field is required.'
      },

  });
  
module.exports = mongoose.model('Drink', drinkSchema);