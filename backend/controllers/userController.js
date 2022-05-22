const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

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

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @dec    Login a new user
// @route  /api/users/login
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('login Route');
});

module.exports = {
  registerUser,
  loginUser,
};
