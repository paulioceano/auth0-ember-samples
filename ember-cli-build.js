/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    nodeModulesToVendor: [
      'node_modules/auth0-js/build',
    ],
  });

  app.import('vendor/auth0.js');

  return app.toTree();
};
