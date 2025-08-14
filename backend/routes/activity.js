const express = require('express');
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function auth(req,res,next){
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ ok:false, error:'No token'});
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (e) { return res.status(401).json({ ok:false, error:'Invalid token' }); }
}

router.post('/', auth, async (req,res) => {
  try {
    const { action, meta } = req.body;
    await Activity.create({ userId: req.user.userId, userEmail: req.user.email, action, meta });
    res.json({ ok:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, error:'Server error' });
  }
});

module.exports = router;
