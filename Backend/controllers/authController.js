const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../Models/UserModle");

// Register a new user
exports.registerUser = async (req, res) => {
    
    const { name, password , email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, password ,email });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }


//   / Get User Profile (Protected Route)
// exports.getUserProfile = async (req, res) => {
//   const user = req.user;
//    res.json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//   });
// };
};
