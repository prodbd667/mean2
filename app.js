const express = require('express'); 
const path = require('path'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const passport = require('passport'); 
const mongoose = require('mongoose'); 
const config = require('./config/db');

//connect to database
mongoose.connect(config.db);

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database');
});

//on connection error
mongoose.connection.on('error', (err) => {
    console.log('database error: ' + err);
});

const app = express(); 

const users = require('./routes/users'); 

//port number
const port = 3000;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//index router
app.get('/', (req, res) => {
    res.send('invalid endpoint');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start server
app.listen(port, () => {
    console.log('server started on port ' + port);
});