const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for item
const entrySchema = new Schema({
    author : String,
    title : String,
    body : String,
    date : {type : Date, default : Date.now()},
    meta : {
        comments: {type : [String]},
        reports : {type : Number, default: 0}
    }
})

//create model for item
const Entry = mongoose.model('item', entrySchema);

module.exports = Entry;