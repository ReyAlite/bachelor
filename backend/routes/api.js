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
const User = require('../models/user').User;
//validation
const validate = require('./validation');
//passport
const passport = require('passport')
require('../config/passport')(passport)

/*function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else{
        // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
        }
}*/

// @route   GET api/entries
// @desc    get all entries
// @access  Private
router.get('/entries', (req, res) => {
    Entry.find({})
        .then(entries => {
            //to not send complete author information (including pw), the entries are modified
            let entryArr = []
            entries.forEach(entry => {
                const e = {
                    author: entry.author.username,
                    body: entry.body,
                    comments: entry.comments,
                    date: entry.date,
                    amountOfReports: entry.amountOfReports,
                    title: entry.title,
                    __v: entry.__v,
                    _id: entry._id,
                }
                entryArr.push(e)
            })
            res.status(200).json(entryArr)
        })
        .catch(err => console.log(err))
});

// @route   POST api/entries
// @desc    post a new entry
// @access  Private
router.post('/entries', (req, res) => {
    if (req.body) {
        User.findById(req.body.userId)
            .then(user => {
                Entry.create({
                    title : req.body.title,
                    body : req.body.body,
                    author : user,
                })
                    .then(data => {
                        res.status(200).json(data)
                    })
                    .catch(err => console.log(err))
            })
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

router.put('/entries/:id', (req, res) => {
    console.log(req.body)
    Entry.findById(req.params.id)
        .then(entry => {
            if(entry.reportedBy.includes(req.body.userId)){
                res.json("you already reported this entry")
            } else {
                entry.reportedBy.push(req.body.userId)
                entry.amountOfReports = ++entry.amountOfReports
                entry.save()
                    .then(() => {
                        res.status(200).json(entry)
                    })
            }
        })
        .catch(err => console.error(err))
})

/*router.get('/entries/:id', (req, res) => {
    const {id} = req.params;
    console.log(req)
    Entry.findById(id)
        .then(entry => {
            console.log(entry)
        })
        .catch(err => console.error(err))
})*/

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