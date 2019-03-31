const express = require('express');

const userController = require('./index.controller');
const middleware = require('../../middleware');

const router = express.Router();

router
    .get('/', middleware.check, userController.getAllUsers)
    .post('/', middleware.check, userController.createUser)
    .delete('/', middleware.check, userController.deleteUser)
    .put('/', middleware.check, userController.updateUser)

module.exports = router;