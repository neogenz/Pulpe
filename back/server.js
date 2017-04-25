'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
process.env.NODE_ENV = 'development';
const configHelper = require('./_helpers/ConfigHelper')(process.env.NODE_ENV);
const endpointConfig = require('./_config/endpoint.json')[process.env.NODE_ENV];
process.env.PORT = endpointConfig.portNumber;

// configuration ==============================================================
app.set('port', process.env.PORT || endpointConfig.portNumber);
app.use(morgan('dev'));
process.env.JWT_SECRET = 'applicationesimedpulpe';
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Run server ==================================================================
mongoose.Promise = global.Promise;
mongoose.connect(configHelper.buildDatabaseConnectionURI());
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + configHelper.buildDatabaseConnectionURI());
  require('./routing')(app);
  const AuthenticationService = require('./_services/authentication.service');

  const Member = require('./_model/Member');
  const member = new Member();
  member.firstnName = 'Maxime';
  member.lastName = 'De Sogus';
  member.email = 'admin@pulpe.fit';
  member.password = 'esimed';
  //new AuthenticationService().signupBy('Maxime', 'De Sogus', 'admin@pulpe.fit', 'esimed');


  //const Gym = require('./_model/Gym');
  //const gymRaw = {
  //    name: 'Keep cool',
  //    address: '13 rue de la garde, 84000 Avignon',
  //    openingHour: new Date(),
  //    closingHour: new Date()
  //  },
  //  gym = new Gym(gymRaw);
  //gym.save().then(function (gym) {
  //
  //  const Member = require('./_model/Member');
  //  const memberRaw = {
  //      firstName: 'Maxime',
  //      gym_id: gym.id,
  //      lastName: 'De Sogus',
  //      dateOfBirth: new Date(1994, 11, 17)
  //    },
  //    member = new Member(memberRaw);
  //  member.save();
  //});


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
