const mongoose = require('mongoose');
const bcrypt = require(bcryptjs);

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
  roles: {
    type: [String],
    required: [true, 'Please enter role'],
    enum: ['teacher', 'student', 'admin'],
  },
  password: {
    type: String,
    reqiured: [true, 'Please enter password'],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Please enter valid password"
    ],
    select: false,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
}

const UserSchema = new mongoose.Schema(userObj);

// Encrypt password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})


module.exports = mongoose.model(UserSchema);
