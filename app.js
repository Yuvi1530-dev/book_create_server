var express = require('express');
var bodyParser = require('body-parser');
var book = require('./routes/book_route');
var process = require('dotenv').config();
var app = express();
// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = "mongodb+srv://yuvarajmeandev:upmCD4eYcGPHToF6@cluster0.n0waots.mongodb.net/book_Db";
var mongoDB = dev_db_url;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var cors = require('cors');
var corsOption = {
    origin: 'http://localhost:4200',
    potionSuccessStatus: 200,
}
app.use(cors(corsOption));

app.use(bodyParser.json({
    limit: '150mb',
    extended: true,
    strict: false
}));
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));
app.use('/api/v1/book', book);
var port = 3003;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

