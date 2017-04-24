const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
process.env.NODE_ENV = 'development';
const endpointConfig = require('./_config/endpoint.json')[process.env.NODE_ENV];
process.env.PORT = endpointConfig.portNumber;

// configuration ==============================================================
app.set('port', process.env.PORT || endpointConfig.portNumber);
app.use(morgan('dev'));

process.env.JWT_SECRET = 'applicationcarmanager';
app.use(cors({credentials: true, origin: true}));


require('./routing')(app);

//const router = new Router(app);
//router.buildRoutes();

// Run server ==================================================================
//mongoose.connect(dbURI);
//mongoose.connection.on('connected', function () {
//  console.log('Mongoose default connection open to ' + dbURI);
//  require('./routing')(app);
//  require('./controllers/AgentControllerProvider')(app);
//  require('./controllers/ParkControllerProvider')(app);
//  require('./controllers/ClientControllerProvider')(app);
//  require('./controllers/LocationControllerProvider')(app);
//  require('./controllers/AgencyControllerProvider')(app);
//  require('./controllers/PriceControllerProvider')(app);
//  require('./controllers/BillingControllerProvider')(app);
//
//
//// If the connection throws an error
//mongoose.connection.on('error', function (err) {
//  console.log('Mongoose default connection error: ' + err);
//});
//
//// When the connection is disconnected
//mongoose.connection.on('disconnected', function () {
//  console.log('Mongoose default connection disconnected');
//});
//
//// If the Node process ends, close the Mongoose connection
//process.on('SIGINT', function () {
//  mongoose.connection.close(function () {
//    console.log('Mongoose default connection disconnected through app termination.');
//    process.exit(0);
//  });
//});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
//}());