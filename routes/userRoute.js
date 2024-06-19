const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User.js');

router.post('/signup', async (req, res) => {
  try {
    const { email, username, password, confirmPassword  } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists. Please choose a different username.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ email, username, password: hashedPassword });
    
    await newUser.save();
    return res.redirect('/login.html');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during user registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email");
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).send("Invalid password");
    }
  
    req.session.userId = user._id;
    return res.redirect('/home.html');
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

router.get('/is-authenticated', async (req, res) => {
  if (req.session && req.session.userId) {
    const user = await User.findById(req.session.userId);
    res.send({ authenticated: true, user: { email: user.email } });
  } else {
    res.send({ authenticated: false });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("An error occurred during logout");
    }
    res.clearCookie('accessToken'); 
    res.send({ message: "Logged out!" });
  });
});

module.exports = router;
