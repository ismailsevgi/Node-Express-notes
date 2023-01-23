const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/subdir/index', (req, res) => {
  console.log('req.url: ', req.url);
  console.log('Subdir request');

  fs.readFile(
    path.join(__dirname, '../../views/subdir/index.html'),
    'utf-8',
    (err, data) => {
      if (err) throw Error('Subdir hata');
      res.send(data);
    }
  );
});

module.exports = router;
