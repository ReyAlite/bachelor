//Api routes to enable the connection from the frontend with the server
const express = require ('express');
const router = express.Router();
const Entry = require('../models/entry');

// @route   GET api/entries
// @desc    get all entries
// @access  Private
router.get('/entries', (req, res) => {
    Entry.find({})
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
});

// @route   POST api/entries
// @desc    post a new entry
// @access  Private
router.post('/entries', (req, res) => {
    if(req.body){
        Entry.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))
    } else {
        res.json({
            err : 'empty input'
        })
    }
});

// @route   DELETE api/entries/:id
// @desc    delete an entry
// @access  Private
router.delete('/entries/:id', (req, res) => {
    //Entry.delete()
})

module.exports = router;