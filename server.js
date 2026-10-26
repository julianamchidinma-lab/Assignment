// server.js
const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let idCounter = 1;

// CREATE
app.post('/users', (req, res) => {
  const { name, email, bio } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email required' });
  }
  const user = { id: idCounter++, name, email, bio, created_at: new Date() };
  users.push(user);
  res.status(201).json(user);
});

// READ ALL
app.get('/users', (req, res) => {
  res.json(users);
});

// READ ONE
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { name, email, bio } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (bio) user.bio = bio;
  res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: 'User deleted' });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));