const fsPromises = require('fs').promises;
const path = require('path');

const databasePath = path.join(__dirname, '../../data/data.json');

async function DeleteDataRoute(req, res) {
  let body = req.body;
  console.log('delete request');
  const data = await fsPromises.readFile(databasePath, 'utf-8', (err, data) => {
    if (err) throw err;
    return data;
  });

  const jsonFile = JSON.parse(data);

  const jsonModifiedArray = jsonFile.filter((user) => {
    if (user.id !== body.id) {
      return user;
    }
  });

  try {
    await fsPromises.writeFile(databasePath, JSON.stringify(jsonModifiedArray));

    res.status(200).json({ msg: 'Deleted!!' });
  } catch (error) {
    res.status(500).send({ error: err });
  }
}

module.exports = DeleteDataRoute;
