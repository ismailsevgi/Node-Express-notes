const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const databasePath = path.join(__dirname, '../../data/data.json');

async function PutDataRoute(req, res) {
  let body = req.body;
  console.log('Put request');
  const data = await fsPromises.readFile(databasePath, 'utf-8', (err, data) => {
    if (err) throw err;
    return data;
  });

  const jsonFile = JSON.parse(data);

  const jsonModifiedArray = jsonFile.map((user) => {
    if (user.id === body.id) {
      return req.body;
    } else {
      return user;
    }
  });

  try {
    await fsPromises.writeFile(databasePath, JSON.stringify(jsonModifiedArray));
    console.log('Success');
    res.status(200).json({ msg: 'Success!' });
  } catch (error) {
    console.log('Error');
    res.status(500).send({ error: error });
  }
}

module.exports = PutDataRoute;
