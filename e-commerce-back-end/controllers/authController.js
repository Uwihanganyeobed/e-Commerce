const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modules/User');
const { JWT_SECRET } = require('../config/env');

// User Signup
exports.signup = async (req, res) => {
  console.log(req.body);

  const { name, email, password, phone, role = "User" } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name, email, password: hashedPassword, phone, role
    });

    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// User Login
exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
