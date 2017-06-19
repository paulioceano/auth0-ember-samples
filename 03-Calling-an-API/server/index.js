/*jshint node:true*/
module.exports = function(app) {
  const messageRoute = require('./mocks/messages.js');

  // Log proxy requests
  var morgan = require('morgan');
  app.use(morgan('dev'));
  messageRoute(app);
};
