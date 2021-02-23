const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

//friend schema
const friendSchema = new Schema({
    user: {type: [User.userSchema], required: true},
    date: {type: Date, default: Date.now()}
})

//create model for item
const Friend = mongoose.model('friend', friendSchema);

exports.friendSchema = friendSchema;
module.exports = Friend;