const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

//comment schema
const commentSchema = new Schema({
    author : {type: User.userSchema, required: true},
    body : {type: String, required: true},
    date : {type : Date, default : Date.now(), required: true},
})

//create model for item
const Comment = mongoose.model('comment', commentSchema);

exports.commentSchema = commentSchema;
exports.Comment = Comment;