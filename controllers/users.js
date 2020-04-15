const User = require('../models/User');

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = async function (req, res) {
  const user = await User.find();
  res.json({ success: true, data: user })
}
