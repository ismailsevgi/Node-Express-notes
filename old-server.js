const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    console.log(`Worked: ${contentType}`);
    const data = await fsPromises.readFile(
      filePath,
      !contentType.includes('image') ? 'utf-8' : ''
    );
    response.writeHead(filePath.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    });
    response.end(data);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'application/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== '/') {
    console.log('HTML ext added!');
    filePath += '.html';
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    console.log('File Exists!');
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case 'old-blogPage.html':
        res.writeHead(301, { Location: '/blogPage.html' });
        res.end();
        break;
      default:
        //server 404
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

server.listen(PORT, () => {
  console.log('Server running on ' + PORT);
});
