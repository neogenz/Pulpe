const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
process.env.NODE_ENV = 'development';
const configHelper = require('./_helpers/ConfigHelper')(process.env.NODE_ENV);
const endpointConfig = require('./_config/endpoint.json')[process.env.NODE_ENV];
process.env.PORT = endpointConfig.portNumber;

// configuration ==============================================================
app.set('port', process.env.PORT || endpointConfig.portNumber);
app.use(morgan('dev'));
process.env.JWT_SECRET = 'applicationesimedpulpe';
app.use(cors({credentials: true, origin: true}));


// Run server ==================================================================
mongoose.connect(configHelper.buildDatabaseConnectionURI());
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + configHelper.buildDatabaseConnectionURI());
  require('./routing')(app);
});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination.');
    process.exit(0);
  });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
