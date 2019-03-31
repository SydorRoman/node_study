const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const config = require('config');

const app = express();

// routes
const userRoute = require('../routes/users');
const authRoute = require('../routes/auth')
// "mongodb://localhost:27017/usersdb"

// db connect
const host = config.get('database.connection.host');
const port = config.get('database.connection.port');
const dbName = config.get('database.connection.database');
const client = config.get('database.client');
const database = `${client}://${host}:${port}/${dbName}`;
mongoose.connect(database, {useNewUrlParser: true} , (err) => {
    if (err) console.log(err);
})

app
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json());

app.use('/users', userRoute);
app.use('/auth', authRoute);

app.listen(config.get('api.port'), () => {
  console.log('*** Server Started ***');
});