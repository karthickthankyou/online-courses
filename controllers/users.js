const User = require('../models/User');

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = async function (req, res) {
  const user = await User.find();
  res.json({ success: true, data: user })
}


// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.createUser = async function (req, res) {
  console.log(req.body);

  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  })


}
