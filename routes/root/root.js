const express = require('express');
const HomeRoute = require('./Home');
const blogRoute = require('./BlogRoute');

const router = express.Router();

router.get('/', HomeRoute);

router.get('/blog', blogRoute);

router.get('/old-blog', (req, res) => {
  // fs.readFile(mainHtml, 'utf-8', (err, data) => {
  //   res.send(data);
  // });

  //resim yüklenmeyecek, sadece html dosyasını yüklüyor.
  //HTML in içindeki dosyaların yerini bilmiyor.
  res.redirect(301, '/blog');
});

module.exports = router;
