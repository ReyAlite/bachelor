const express = require ('express');
const router = express.Router();
const Entry = require('../models/entry');

router.get('/entries', (req, res) => {
    Entry.find({})
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
});

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

router.delete('/entries/:id', (req, res) => {
    //Entry.delete()
})

module.exports = router;