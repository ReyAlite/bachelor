const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    friends: {
        type: [String]
    }
})

//create model for item
const User = mongoose.model('user', userSchema);

module.exports = User;