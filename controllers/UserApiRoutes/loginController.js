const fs = require('fs');
const express = require('express');
const bcrypt = require('bcrypt');
//datayı buraya kayıt et.
//gelen body den username ile pass'i çıkar.
//username db  de varmı kontrol et
//-yoksa error gönder
//-varsa kullanıcının şifresini 10 salt ile compare et.
//--şifre yanlışsa hata gönder
//--doğru ise kullanıcı bilgileri içeren bir token gönder.

const userDatabase = require('../../model/users.json');

async function Login(req, res) {
  const { username, password } = req.body;

  //check if the user exists in database
  const userCheck = userDatabase.find((person) => person.username === username);

  //if there is no user, return "unauthorized"
  if (!userCheck) {
    res.sendStatus(401);
  }

  const match = await bcrypt.compare(password, userCheck.password);

  if (match) {
    //if user's password is matched
    res.json({ ...userCheck, jwt: 'intert cokiee here' });
  } else {
    //if password is wrong, return unauthorized!
    res.sendStatus(401);
  }
}

module.exports = Login;
