const express = require('express');
const Note = require('../models/Note');
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ ok: false, error: 'No token' });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    return next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: 'Invalid token' });
  }
}

// Upload note
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ ok: false, error: 'Forbidden' });
  const { title, semester, part } = req.body;
  if (!req.file) return res.status(400).json({ ok: false, error: 'No file uploaded' });

  try {
    const note = await Note.create({
      title,
      semester,
      part,
      filename: req.file.filename,
      uploadedBy: req.user.email
    });
    await Activity.create({
      userEmail: req.user.email,
      action: 'upload_note',
      meta: { noteId: note._id }
    });
    res.json({ ok: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Get all notes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { part, semester } = req.query; // category and semester
    let filter = {};

    if (part) filter.part = part;         // e.g., T1, T2
    if (semester) filter.semester = semester; // e.g., "Semester 1"

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json({ ok: true, notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});


// Update note
router.put('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ ok: false, error: 'Forbidden' });
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ ok: true, note: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Delete note
router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ ok: false, error: 'Forbidden' });
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ ok: false, error: 'Not found' });

    // delete file from uploads folder
    const filePath = path.join(__dirname, '../uploads', note.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await note.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});
// Summarize note
router.post('/summarize/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ ok: false, error: 'Note not found' });

    // Here you would read the file and summarize it using an AI API or your own logic
    // For now we simulate:
    const summary = `This is a simulated summary for note "${note.title}".`;

    res.json({ ok: true, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

module.exports = router;
