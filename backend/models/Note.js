const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  semester: { type: String, required: true },
  part: { type: String, required: true }, // T1..T4
  filename: { type: String, required: true },
  uploadedBy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
