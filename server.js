// server.js
// Simple Express server to serve static files and handle contact form submissions.
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// API route to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }

  // Basic sanitation
  const clean = (s) => String(s || '').toString().replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
  const entry = {
    id: uuidv4(),
    name: clean(name),
    email: clean(email),
    phone: clean(phone),
    service: clean(service),
    message: clean(message),
    createdAt: new Date().toISOString()
  };

  const dataFile = path.join(__dirname, 'data', 'leads.json');
  let leads = [];
  try {
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, 'utf8') || '[]';
      leads = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading leads.json', e);
  }
  leads.push(entry);
  try {
    fs.writeFileSync(dataFile, JSON.stringify(leads, null, 2));
  } catch (e) {
    console.error('Error writing leads.json', e);
  }

  // You can integrate email delivery here (e.g., Nodemailer, Postmark, SendGrid).
  // For now we just persist to disk.
  return res.json({ ok: true, id: entry.id });
});

// Fallback to index.html for unknown routes (optional; good for SPAs)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`New Enterprise Sanitation running at http://localhost:${PORT}`);
});
