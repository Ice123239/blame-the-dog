const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const leaderboard = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

app.post('/api/leaderboard', (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const score = Number(req.body.score);

  if (!name || name.length > 24 || !Number.isFinite(score) || score < 0) {
    return res.status(400).json({ error: 'กรุณาระบุชื่อไม่เกิน 24 ตัวอักษรและคะแนนที่ถูกต้อง' });
  }

  leaderboard.push({ name, score: Math.floor(score) });
  leaderboard.sort((first, second) => second.score - first.score);
  leaderboard.splice(5);

  return res.status(201).json(leaderboard);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Blame The Dog! is ready at http://localhost:${PORT}`);
  });
}

module.exports = app;