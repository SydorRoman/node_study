const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const apiHelper = require('../../helpers/api');
const getError = require('../../helpers/error-maker');
const constants = require('../../../constants/index');
const config = require('config');

const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email) return apiHelper.builder(res, getError(constants.EMAIL_REQUIRED));
    if (!password) return apiHelper.builder(res, getError(constants.PASSWORD_REQUIRED));

    const user = await new User().getByEmail(email);
    if (!user) apiHelper.builder(res, getError(constants.USER_NOT_EXIST));
    const isValid = await new User().checkPassword(password, user.password);

    if (!isValid) return apiHelper.builder(res, getError(constants.WRONG_PASSWORD));

    const token = jwt.sign(user._id.toString(), config.get('jwt.secretKey'));
    return apiHelper.builder(res, token);
}

const singUp = async (req, res) => {
    let { email, password } = req.body;

    if (!email) return apiHelper.builder(res, getError(constants.EMAIL_REQUIRED));
    if (!password) return apiHelper.builder(res, getError(constants.PASSWORD_REQUIRED));

    const user = await new User().getByEmail(email);
    if (user) return apiHelper.builder(res, getError(constants.USER_EXIST));

    const user = await new User().createUser({ email, password });
    return apiHelper.builder(res, user);
}

module.exports = {
     logIn,
     singUp
}