const express = require ('express');
const router = express.Router();
const Entry = require('../models/entry');

router.get('/entries', (req, res) => {
    Entry.find({})
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
});

router.post('/entries', (req, res) => {
    //Entry.create()
});

router.delete('/entries/:id', (req, res) => {
    //Entry.delete()
})

module.exports = router;