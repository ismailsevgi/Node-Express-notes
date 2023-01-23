const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');

const router = express.Router();

router.get('/register', async (req, res) => {
  console.log('Register page Requested!');
  const filePath = path.join(
    __dirname,
    '../../views/Login-Register-Pages/register.html'
  );
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, '../../views/Login-Register-Pages/register.html'),
      'utf-8'
    );
    res.send(data);
  } catch (error) {
    res.send({ data: 'Error' + error });
  }
});

module.exports = router;
