const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/blog', (req, res) => {
  console.log('Blog Request!');
  res.sendFile(path.join(__dirname, '../../views/root/blogPage.html'));
});

module.exports = router;
