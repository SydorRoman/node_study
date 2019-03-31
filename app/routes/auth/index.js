const express = require('express');

const authController = require('./index.controller');

const router = express.Router();

router
    .post('/signin', authController.singIn)
    .post('/signup', authController.login)

module.exports = router;
