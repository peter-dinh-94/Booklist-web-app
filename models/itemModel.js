const mongoose = require('mongoose');
const slugify = require('slugify');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A post must have a title'],
    trim: true,
    maxlength: 30,
    minlength: 10
  },
  author: {
    type: String,
    //require: [true, 'A post must have an author'],
    trim: true,
    maxlength: 30,
    minlength: 10
  },
  type: {
    type: String,
    //require: [true, 'A post must have a type'],
    trim: true,
    maxlength: 20
  },
  slug: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  price: Number,
  images: String,
  locations: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number]
  }
});

itemSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
