const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['v_pizza', 'nv_pizza', 'burger', 'sandwich', 'drinks']
  },
  available: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FoodItem', foodItemSchema); 