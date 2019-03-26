const mongoose = require('mongoose');
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
                if (err) return reject(err);
                resolve(users);
            })
        });
    }

    createUser(userData) {
        return new Promise(async (resolve, reject) => {
            await user.create(userData, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        });
    }
    deleteUserById(id){
        return new Promise(async (resolve, reject) => {
            await user.findByIdAndDelete(id, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        });
    }
 
    updateUser(userData) {
        return new Promise(async (resolve, reject) => {
            await user.update(userData, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        });
    }


}

module.exports = User;