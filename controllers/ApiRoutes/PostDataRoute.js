const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../../data/data.json');
function PostDataRoute(req, res) {
  let body = req.body;

  fs.readFile(databasePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Post request error, ', err);
    } else {
      //convert data into an array
      const jsonFile = JSON.parse(data);

      //add the data from the POST request
      jsonFile.push(body);

      //write back
      fs.writeFile(databasePath, JSON.stringify(jsonFile), (err) => {
        if (err) {
          res.status(500).send('Error while writing back', err);
        } else {
          res.send('Data updated!');
        }
      });
    }
  });
}

module.exports = PostDataRoute;
