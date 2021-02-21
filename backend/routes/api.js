//Api routes to enable the connection from the frontend with the server
const express = require('express');
//express router middleware
const router = express.Router();
//used to hash and salt user password
const bcrypt = require('bcryptjs');
//jwt token
const jwt = require('jsonwebtoken');
//Models
const Entry = require('../models/entry');
const User = require('../models/user');
//validation
const validate = require('./validation');

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
    if (req.body) {
        console.log(req.body)
        Entry.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))
    } else {
        res.json({
            err: 'empty input'
        })
    }
});

// @route   DELETE api/entries/:id
// @desc    delete an entry
// @access  Private
router.delete('/entries/:id', (req, res) => {
    //Entry.delete()
})

// @route   POST api/user/register
// @desc    register a new user
// @access  Public
router.post('/user/register', (req, res) => {
    //validate incoming data
    const {errors, isValid} = validate.validateInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    //Look for user in db
    User.findOne({username: username})
        .then(user => {
            if (user) {
                return res.status(400).json({username: 'Username bereits vergeben'})
            } else {
                const newUser = new User({
                    username: username,
                    password: password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch((err => console.error(err)))
                    })
                })
            }
        });
})

// @route   POST api/user/login
// @desc    login using JWT token
// @access  Public
router.post('/user/login', (req, res) => {
    const {errors, isValid} = validate.validateInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.status(404).json("incorrect input")
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username
                        };
                        jwt.sign(
                            payload,
                            "secret",
                            {expiresIn: "1y"},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer: " + token,
                                    user : user
                                });
                            })
                    } else {
                        return res
                            .status(404).json("incorrect input")
                    }
                })
        })
})

module.exports = router;