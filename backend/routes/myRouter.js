const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from route');
});

module.exports = router;
