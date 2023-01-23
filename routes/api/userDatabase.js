const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');

const router = express.Router();
const RegisterUser = require('../../controllers/UserApiRoutes/registerController');
const loginUser = require('../../controllers/UserApiRoutes/loginController');

router.post('/user/login', loginUser);
router.post('/user/register', RegisterUser);

module.exports = router;
