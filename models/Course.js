const mongoose = require('mongoose');

const courseObj = {
  title: {
    type: String,
    trim: true,
    required: [true, 'Please enter title']
  },
  description: {
    type: String,
    required: [true, 'Please enter description']
  },
  duration: {
    type: Number,
    min: 0
  },
  price: {
    type: Number,
    required: [true, 'Please enter the price'],
    min: 0,
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please enter minimum skill required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}

const CourseSchema = new mongoose.Schema(courseObj);

module.exports = mongoose.model("Course", CourseSchema);
