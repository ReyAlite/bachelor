const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Friend = require('./friend');

//user schema
const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    date: { type: Date, default: Date.now(), required: true},
    friends: {type: [String]},
    reportedEntries: Number
})

//create model for item
const User = mongoose.model('user', userSchema);

exports.userSchema = userSchema;
exports.User = User;
