const jwt = require('jsonwebtoken');
const apiHelper = require('../helpers/api');
const getError = require('../helpers/error-maker');
const config = require('config');

const check = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) return apiHelper.builder(res, {message: 'bad =('})

    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
        jwt.verify(token, config.get('jwt.secretKey'));
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return apiHelper.builder(res, {message: 'error'})
        }
    }
    const user = jwt.decode(token, config.get('jwt.secretKey'));
    req.user = user;
    next();
}

module.exports = {
    check
};