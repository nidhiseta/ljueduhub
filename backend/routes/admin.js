const express = require('express');
const Activity = require('../models/Activity');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function adminAuth(req,res,next){
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ ok:false, error:'No token'});
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (data.role !== 'admin') return res.status(403).json({ ok:false, error:'Not admin'});
    req.user = data;
    next();
  } catch (e) { return res.status(401).json({ ok:false, error:'Invalid token' }); }
}

router.get('/stats', adminAuth, async (req,res) =>{
  const totalNotes = await Note.countDocuments();
  const totalActivities = await Activity.countDocuments();
  const recentActivities = await Activity.find().sort({ createdAt:-1 }).limit(50);
  res.json({ ok:true, data: { totalNotes, totalActivities, recentActivities }});
});

module.exports = router;
