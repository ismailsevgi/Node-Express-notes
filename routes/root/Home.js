const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const loggerMiddleware = require('../../middleware/logEvents');

router.get(
  '/',

  (req, res, next) => {
    console.log('HOME REQ GET GELDİ');

    fs.readFile(
      path.join(__dirname, '../../views/root/index.html'),
      'utf-8',
      (err, data) => {
        console.log(err);
        res.send(data);
      }
    );
  }
);

module.exports = router;
