const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const apiHelper = require('../../helpers/api');
const getError = require('../../helpers/error-maker');
const constants = require('../../../constants/index');
const config = require('config');

const singIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await new User().getByEmail(email);
    if (!user) apiHelper.builder(res, getError(constants.USER_NOT_FOUND))
    const isValid = await new User().checkPassword(password, user.password);
    if (isValid) {
        const token = jwt.sign(user._id.toString(), config.get('jwt.secretKey'))
        return apiHelper.builder(res, {token})
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;
    password = bcrypt.hashSync(password, 10)
    const user = await new User().createUser({ email, password });
    if (user) return apiHelper.builder(res, user)
    return apiHelper.builder(res, {message: 'BAD!'})
}

module.exports = {
     singIn,
     login
}