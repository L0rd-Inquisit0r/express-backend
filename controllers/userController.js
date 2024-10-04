const { users } = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = (req, res) => {
  const { username, password, email } = req.body;
  const newUser = { id: users.length + 1, username, password, email };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', newUser });
};

// Login User
const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

// Get User Profile
const getUserProfile = (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
