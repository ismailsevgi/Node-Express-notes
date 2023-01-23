const fs = require('fs');
const path = require('path');

//readable stream
const rs = fs.createReadStream(
  path.join(__dirname, './courseFolders/exFiles/lorem.txt'),
  {
    encoding: 'utf-8',
  }
);

//writeable stream
const ws = fs.createWriteStream(
  path.join(__dirname, './courseFolders/exFiles/lorem2.txt'),
  {
    encoding: 'utf-8',
  }
);
// rs.on('data', (chunk) => {
//   ws.write(chunk);
// });
rs.pipe(ws);

//check if there is the file or dir
//fs.exists boolean döner
if (!fs.existsSync(path.join(__dirname, './courseFolders/new'))) {
  fs.mkdir(path.join(__dirname, './courseFolders/new'), (err) => {
    if (err) throw err;
    console.log('A new directory arised!');
  });
}

//eğer dosya varsa sil
if (fs.existsSync(path.join(__dirname, './courseFolders/new'))) {
  fs.rmdir(path.join(__dirname, './courseFolders/new'), (err) => {
    if (err) throw err;
    console.log('Silindi!');
  });
}
