const User = require('../../models/user');
const apiHelper = require('../../helpers/api');
const getError = require('../../helpers/error-maker')

const getAllUsers = async (req,res) => {
    // const users = await new User().getAllUsers();
    // return apiHelper.builder(res, users);

    // ці записи еквівалнтні

    await new User().getAllUsers()
        .then(users => apiHelper.builder(res, users))
        .catch(err => apiHelper.builder(res, getError(err)))
}

const createUser = async (req, res) => {

    const user = req.body;
    const createdUser = await new User().createUser(user);
    return apiHelper.builder(res, createdUser);
}

const deleteUser = () => {

}

const updateUser = () => {

}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
}