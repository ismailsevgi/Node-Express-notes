const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

async function promiseFuns(arg1) {
  await fsPromises.writeFile(
    path.join(__dirname, './courseFolders/exFiles/testFile.txt'),
    'This is the Starting Point',
    (err) => {
      if (err) throw err;
    }
  );
  await fsPromises.appendFile(
    path.join(__dirname, './courseFolders/exFiles/testFile.txt'),
    ` This is added data: ${arg1}`,
    (err) => {
      if (err) throw err;
    }
  );
}

// async function writesFiles() {
//   fs.writeFileSync(
//     path.join(__dirname, './courseFolders/exFiles/testFile.txt'),
//     'This is the test data!',
//     (err) => {
//       if (err) throw err;
//     }
//   );
//   fs.appendFileSync(
//     path.join(__dirname, './courseFolders/exFiles/testFile.txt'),
//     'This is second text data!',
//     (err) => {
//       if (err) throw err;
//     }
//   );
//   fs.renameSync(
//     path.join(__dirname, './courseFolders/exFiles/testFile.txt'),
//     path.join(__dirname, './courseFolders/exFiles/testFile3.txt'),
//     (err) => {
//       if (err) throw err;
//     }
//   );
// }
// writesFiles();

const readFileAsync = async (arg2) => {
  try {
    await fsPromises.appendFile(
      path.join(__dirname, './courseFolders/exFiles/testFile.txt'),
      `\n this data:${arg2} added after the reading!`
    );
    const data = await fsPromises.readFile(
      path.join(__dirname, './courseFolders/exFiles/testFile.txt'),
      'utf-8'
    );
    console.log('Readed: ', data);
  } catch (error) {
    console.log('Error: ', error);
  }
};

const writeAndRead = async (arg1, arg2) => {
  await promiseFuns(arg1);
  await readFileAsync(arg2);
};

writeAndRead('My ARG1', 'My arg2');
