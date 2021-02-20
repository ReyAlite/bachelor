//Node.js Server connects to mongoDB database and provides route

const express = require('express');
//middleware to parse incoming request bodies
const bodyParser = require('body-parser');
//provides functions to work with database
const mongoose = require('mongoose');
const path = require('path');
//api routes
const routes = require('./routes/api');

//enable access to projects environment variables
require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;

//configure cors headers for server, to allow access from other ports than 4000
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connect to database
mongoose.connect('mongodb://localhost/forum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));

//mongoose promise is deprecated that's why nodes promise is used instead
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Hello, I'm breathing on port ${port}`)
});