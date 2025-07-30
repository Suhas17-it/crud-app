const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST new item
router.post('/', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  const saved = await newItem.save();
  res.json(saved);
});

// PUT update item
router.put('/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(updated);
});

// DELETE item
router.delete('/:id', async (req, res) => {
  const deleted = await Item.findByIdAndDelete(req.params.id);
  res.json(deleted);
});

module.exports = router;
