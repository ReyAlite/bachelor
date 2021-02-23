const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Comment = require('./comment');

//entry schema
const entrySchema = new Schema({
    author: {type: User.userSchema, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: Date, default: Date.now(), required: true},
    reportedBy: [User.userSchema],
    amountOfReports: Number,
    comments: [Comment.commentSchema]
})

//create model for item
const Entry = mongoose.model('item', entrySchema);

module.exports = Entry;