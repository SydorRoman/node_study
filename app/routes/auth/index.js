const express = require('express');

const authController = require('./index.controller');

const router = express.Router();

router
    .post('/login', authController.logIn)
    .post('/signup', authController.singUp)

module.exports = router;
