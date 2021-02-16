const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for item
const itemSchema = new Schema({
    author : String,
    title : String,
    body : String,
    date : {type : Date, default : Date.now()},
    meta : {
        reports : {type : Number, default: 0}
    }
})

//create model for item
const Todo = mongoose.model('item', itemSchema);

module.exports = Todo;