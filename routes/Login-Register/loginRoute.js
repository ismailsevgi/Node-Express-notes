const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');

const router = express.Router();

router.get('/login', async (req, res) => {
  console.log('Login Page Requested!');
  const filePath = path.join(
    __dirname,
    '../../views/Login-Register-Pages/login.html'
  );
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, '../../views/Login-Register-Pages/login.html'),
      'utf-8'
    );
    res.send(data);
  } catch (error) {
    res.send({ data: 'Error' + error });
  }
});

module.exports = router;
