const asyncHandler = require('express-async-handler')

// @dec    Register a new user
// @route  /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // Validation. 400 response is client side error
    res.status(400);
    throw new Error('Please include all fields');
  }

  res.send('Register Route');
})

// @dec    Login a new user
// @route  /api/users/login
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('login Route');
})

module.exports = {
  registerUser,
  loginUser,
};
