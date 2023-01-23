//Express via build-in modules
const express = require('express');
const fs = require('fs');
const path = require('path');

//Defining port for future use
const PORT = process.env.PORT || 3000;
//Using cors for allowing external connections
const cors = require('cors');

//creating server
const app = express();
//importing whitelisted IP's
const corsOptions = require('./CORS-Whitelist/corsOptions');

//importing custom logger middleware
const loggerMiddleware = require('./middleware/logEvents');
const errorHandler = require('./ErrorHandler/handleError');

//Routes
const subdirIndexRoute = require('./routes/subdir/index');
const root = require('./routes/root/root');
const api = require('./routes/api/database');

// build-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application./x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//for json files
app.use(express.json());
//third party cors
app.use(cors(corsOptions));

//serve static files
//Bu middleware ile static bir konum belirleyip dosyaları oradan çekmemizi sağlayabiliriz. Böylece resim, css, js dosyalarını bu root'a bakarak arayacaktır.
app.use(express.static(path.join(__dirname, '/public')));

//subdir içerisinde bu statik yolu kullan
app.use(loggerMiddleware);
//Adding middlewares for /subdir
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//Adding middlewares for /root
app.use('/root', express.static(path.join(__dirname, '/public')));
app.use('/root', loggerMiddleware);

//Chaining
app.use([root, subdirIndexRoute, api]);

app.use(errorHandler);

//Sending 404 page if the routes don't work
app.all('*', (req, res) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, './views/404.html'));
  } else if (req.accepts('json')) {
    res.sendFile({ data: 'Data not here json' });
  } else {
    res.type('txt').send('There is no page text');
  }
});

app.listen(PORT, () => {
  console.log('App is running on ' + PORT);
});
