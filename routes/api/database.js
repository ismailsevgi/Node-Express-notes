const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const router = express.Router();

const databasePath = path.join(__dirname, '../../data/data.json');
const RetriveDataFromDatabase = require('../../controllers/ApiRoutes/GetDataRoute');
const PostDataRoute = require('../../controllers/ApiRoutes/PostDataRoute');
const PutDataRoute = require('../../controllers/ApiRoutes/PutDataRoute');
const DeleteDataRoute = require('../../controllers/ApiRoutes/DeleteDataRoute');

router
  .route('/database')
  .get(RetriveDataFromDatabase)
  .post(PostDataRoute)
  .put(PutDataRoute)
  .delete(DeleteDataRoute);

router.route('/database/:id').get((req, res) => {
  console.log('User ' + req.params.id + ' requested!');

  fs.readFile(databasePath, 'utf-8', (err, data) => {
    const jsonFile = JSON.parse(data);
    console.log('jsonFile: ', jsonFile);
    const findUser = jsonFile.find(
      (user) => user.id === parseInt(req.params.id)
    );
    console.log('findUser: ', findUser);
    res.send(findUser);
  });
});

module.exports = router;
