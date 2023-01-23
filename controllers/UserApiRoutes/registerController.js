const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, '../../model/users.json');

const usersDB = {
  users: require('../../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

async function RegisterUser(req, res) {
  console.log('Register Fetch requested!');
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required!' });
  }

  const dublicate = usersDB.users.find(
    (person) => person.username === username
  );

  if (dublicate) {
    res.status(409).json({ message: 'The username has already been taken!' });
  }

  try {
    //10 salt for more complicated!
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(dbPath, JSON.stringify(usersDB.users));

    res.status(201).json({
      data: true,
      msg: 'User is created successfully',
      body: req.body,
    });
  } catch (error) {
    res
      .status(500)
      .json({ data: false, msg: 'Something went wrong with the server!' });
  }
}

module.exports = RegisterUser;
