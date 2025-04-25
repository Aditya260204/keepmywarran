const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const extractTextFromImage = require('./ocr');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const authRoutes = require('./auth');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/keepmywarranty', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const upload = multer({ dest: 'uploads/' });

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kvbrothers2004@gmail.com',
    pass: 'utxi mfgp skdm dzpo',
  },
});

app.post('/register', (req, res) => {
  const data = req.body;
  let entries = [];

  if (fs.existsSync('data.json')) {
    entries = JSON.parse(fs.readFileSync('data.json'));
  }

  entries.push(data);
  fs.writeFileSync('data.json', JSON.stringify(entries, null, 2));

  // Send email reminder if email is available
  if (data.email) {
    const expiry = new Date(data.warrantyEndDate).toDateString();
    const message = {
      from: 'kvbrothers2004@gmail.com',
      to: data.email,
      subject: '🔔 Warranty Reminder Registered',
      text: `You have registered a warranty for "${data.productName}". It expires on ${expiry}. We’ll remind you before that.`,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error('❌ Email sending failed:', err);
      } else {
        console.log('✅ Email sent:', info.response);
      }
    });
  }

  res.send({ success: true });
});

app.post('/extract', upload.single('invoice'), async (req, res) => {
  if (!req.file) return res.status(400).send({ error: 'No file uploaded' });

  try {
    const text = await extractTextFromImage(req.file.path);
    res.send({ text });
  } catch (err) {
    res.status(500).send({ error: 'OCR failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
