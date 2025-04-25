// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const nodemailer = require('nodemailer');

const router = express.Router();
const JWT_SECRET = 'myjwtsecret';

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kvbrothers2004@gmail.com',
    pass: 'utxi mfgp skdm dzpo',
  },
});

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    res.send({ token, user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).send({ error: 'Signup failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.send({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send({ error: 'Login failed' });
  }
});

module.exports = router;
