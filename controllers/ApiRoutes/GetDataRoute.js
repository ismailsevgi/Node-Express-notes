const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '../../data/data.json');
function RetriveDataFromDatabase(req, res) {
  console.log('Database requested!');

  fs.readFile(databasePath, 'utf-8', (err, data) => {
    res.send(data);
  });

  //this works
  // res.send(require('../../data/data.json'));
}

module.exports = RetriveDataFromDatabase;
