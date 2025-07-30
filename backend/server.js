const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock in-memory DB
let items = [];
let id = 1;

// Routes
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let item = items.find(item => item.id === parseInt(id));
  if (item) {
    item.name = name;
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: id++, name };
  items.push(newItem);
  res.json(newItem);
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== parseInt(id));
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
