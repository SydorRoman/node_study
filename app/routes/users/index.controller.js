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
    const createdUser = await new User().createUser(user); // зроби як в get AllUsers через then and catch
    return apiHelper.builder(res, createdUser);
}

const deleteUser = async (req, res) => { // does it work?
    const id = req.params;
    console.log(id); // ?
    const deletedUser = await new User().deleteUserById(id);
    return apiHelper.builder(res, deletedUser);
}
const updateUser = () =>{} // дороби

// зроби апішку щоб дістати тільки одного юзера по ід
// і дороби таск https://trello.com/c/so8MJK4b/6-user-model
// коли зробиш пересунь карточку в реді ту тестінг))

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
}