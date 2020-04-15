const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userObj = {
  name: {
    type: String,
    required: [true, "Please enter the name"]
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    match: [
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter valid password"
    ],
    select: false,
  },
  roles: {
    type: [String],
    required: [true, "Please enter roles"],
    enum: [
      'teacher',
      'student',
      'admin'
    ],
    default: undefined, // Required wont work as default is []
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}

const UserSchema = new mongoose.Schema(userObj);

// Encrypt password
UserSchema.pre('save', async function (next) {
  console.log(this, 'Saving the document');

  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})


module.exports = mongoose.model('User', UserSchema);
