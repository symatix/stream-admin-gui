var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');


// set up dbs
require('./models/stations');
require('./models/songs');
mongoose.connect(config.mongoUri, { useNewUrlParser: true });

// set up server
var app = express();
app.use(bodyParser.json());
require('./routes/get_data.js')(app)

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT)