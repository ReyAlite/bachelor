const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://localhost/forum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});