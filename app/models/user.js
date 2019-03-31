const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userScheme = new Schema({
    first_name: {
        type: String,
        default: ''
    },
    role: {
        type: Number,
        default: 0
    },
    last_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { 
    versionKey: false 
})

const user = mongoose.model('user', userScheme);

class User {
    static get tableName() {
        return 'users';
    }

    getAllUsers() {
        return new Promise(async (resolve, reject) => {
            await user.find({}, (err, users) => {
                if (err) reject(err);
                resolve(users);
            })
        });
    }

    createUser(userData) {
        return new Promise(async (resolve, reject) => {
            userData.password = bcrypt.hashSync(userData.password, constants.PASS_SALT);
            await user.create(userData, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }
    deleteUserById(id){
        return new Promise(async (resolve, reject) => {
            await user.findByIdAndDelete(id, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    updateUser(userData) {
        return new Promise(async (resolve, reject) => {
            await user.update(userData, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    getByEmail(email) {
        return new Promise(async (resolve, reject) => {
            await user.findOne({email}, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    checkPassword(first, second) {
        return bcrypt.compareSync(first, second);
    }
}

module.exports = User;