const express = require('express');

const userController = require('./index.controller');

const router = express.Router();

router
    .get('/', userController.getAllUsers)
    .post('/', userController.createUser)
    .delete('/', userController.deleteUser)
    .put('/', userController.updateUser)
module.exports = router;